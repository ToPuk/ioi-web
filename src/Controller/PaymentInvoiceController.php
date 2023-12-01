<?php

namespace App\Controller;

use App\Entity\Admission;
use App\Entity\RegUsers;
use App\Entity\Payment;
use App\Entity\PaymentInvoice;
use App\Entity\UserInfo;
use App\Event\PaymentEvent;
use App\Services\Payment\Channel\Qpay\Qpay;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * Route="payment"
 */
class PaymentInvoiceController extends ApiController
{

    /**
     * @Route("/{id}/invoice/create", name="api_payment_invoice_create", methods={"GET"})
     */
    public function create(
        Request $request,
        EntityManagerInterface $em,
        Qpay $qPay,
        $id,
        NormalizerInterface $normalizer
    ): Response {
        /** @var RegUsers $regUser */
        $regUser = $em->getRepository(RegUsers::class)->findOneBy([
            'id' => $id
        ]);
        $payment = new Payment();
        $payment->setTimeCreated(new \DateTime('now'));
        $payment->setState(Payment::STATE_NOT_PAID);
        $payment->setAmountPaid(50000);
        $payment->setPaymentCode($regUser->getId());
        $payment->setTimePaid(new \DateTime('now'));
        $payment->setRegUser($regUser);
        $payment->setAmount(50000);
        $payment->setDescription("extra register");
        $payment->setPaymentType(Payment::TYPE_ADMISSION_REGISTER);
        $em->persist($payment);
        $amount = $payment->getAmount();
        $invoice = new PaymentInvoice();
        $invoice->setPayment($payment);
        $invoice->setInvoiceCode($payment->getPaymentCode() . time());
        $invoice->setAmount($amount);
        $invoice->setTimeCreated(new \DateTime('now'));
        $invoice->setState(PaymentInvoice::STATE_NOT_PAID);
        $em->persist($invoice);
        $em->flush();

        $invoiceData = $qPay->createInvoice($invoice);

        return $this->respond([
            'paymentInvoice' => $normalizer->normalize($invoice, 'object', ['groups' => ['pi', 'p']]),
            // 'invoiceData' => $invoiceData,
        ]);
    }

    // #[Route('/{paymentId}/invoice/{channel}/current', name: 'api_payment_invoice_current', methods: ['GET'])]
    // public function invoiceCurrent(
    //     Request $request,
    //     EntityManagerInterface $em,
    //     Qpay $qPay,
    //     NormalizerInterface $normalizer
    // ): Response {
    //     $paymentId = $request->attributes->getInt('paymentId');
    //     $channel = $request->attributes->get('channel');

    //     $payment = $em->getRepository(Payment::class)->find($paymentId);

    //     $qb = $em->getRepository(PaymentInvoice::class)
    //         ->createQueryBuilder('payment_invoice');

    //     $qb
    //         ->where($qb->expr()->eq('payment_invoice.payment', ':payment'))
    //         ->setParameter('payment', $payment)
    //         ->andWhere($qb->expr()->eq('payment_invoice.channel', ':channel'))
    //         ->setParameter('channel', $channel);

    //     $qb
    //         ->orderBy('payment_invoice.timeCreated', 'DESC');

    //     /** @var PaymentInvoice $invoice */
    //     try {

    //         $invoice = $qb
    //             ->setMaxResults(1)
    //             ->getQuery()
    //             ->getOneOrNullResult();

    //         if ($invoice) {
    //             if ($payment->getState() === Payment::STATE_NOT_PAID && $payment->getAmount() !== $invoice->getAmount()) {
    //                 $invoice = null;
    //             }
    //         }
    //     } catch (NonUniqueResultException $e) {
    //         $invoice = null;
    //     }

    //     $invoiceData = $invoice?->getExtra();

    //     return $this->respond([
    //         'channel' => $channel,
    //         'paymentInvoice' => $normalizer->normalize($invoice, 'object', ['groups' => ['pi', 'p']]),
    //         'invoiceData' => $invoiceData,
    //     ]);
    // }
    /**
     * @Route("/invoice/create", name="api_payment_invoice_check", methods={"GET"})
     */
    public function check(
        Request $request,
        EntityManagerInterface $em,
        EventDispatcherInterface $eventDispatcher,
        Qpay $qPay
    ): Response {
        $invoiceCode = $request->query->get('invoiceCode');
        $isWebhook = $request->query->get('is_webhook', 'no');

        $invoice = $em->getRepository(PaymentInvoice::class)->findOneBy([
            'invoiceCode' => $invoiceCode
        ]);
        if (!$invoice) {
            return $this->setStatusCode(480)->respondWithErrors("Invoice not Found");
        }

        $stateOld = $invoice->getState();

        $invoice = $qPay->checkPaymentInvoice($invoice);

        if ($invoice->getState() === PaymentInvoice::STATE_PAID && $stateOld !== PaymentInvoice::STATE_PAID) {
            $payment = $invoice->getPayment();
            if ($payment && $payment->getState() !== Payment::STATE_PAID) {
                if ($payment->getRegUser()) {
                    $count = $payment->getRegUser();
                    $payment->getRegUser();
                }
                $payment->setState(Payment::STATE_PAID);
                $payment->setTimePaid(new \DateTime('now'));
                $payment->setAmountPaid($invoice->getAmount());
                $em->flush();

                $event = new PaymentEvent($payment);
                $eventDispatcher->dispatch($event, PaymentEvent::PAID);
            }
        }

        if ($isWebhook === 'yes') {
            return new Response("SUCCESS", 200);
        }

        return $this->respond([
            'checkResult' => $invoice->getExtra(),
        ]);
    }
}
