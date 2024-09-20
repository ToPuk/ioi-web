<?php

namespace App\Controller;

use App\Entity\RegUsers;

use App\Entity\Payment;
use App\Entity\PaymentInvoice;
use App\Event\PaymentEvent;
use App\Services\Payment\Channel\Qpay\Qpay;
use Symfony\Component\HttpFoundation\Response;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\Exception\TransportException;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Response\QrCodeResponse;
use Symfony\Component\EventDispatcher\EventDispatcher;
use App\Entity\Admission;
use App\Entity\UserInfo;
use App\Repository\PaymentInvoiceRepository;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * @Route("/")
 */
class DefaultController extends AbstractController
{

    /**
     * @Route("/", name="default_index")
     */
    public function indexAction(Request $request)
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/payment", name="payment_index")
     */
    public function payment(Request $request, Qpay $qPay, MailerInterface $mailer)
    {
        $status = $request->get('status');
        $qrCode = $request->get('qrCode');
        $invoiceId = $request->get('invoiceId');
        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();
        $invoiceData = null;
        $form = $this->createFormBuilder()
            ->setMethod('GET')
            ->add('lastname', TextType::class, [
                'label' => 'Овог',
                'attr' => ['class' => 'form-control'],
                'required' => true,
            ])
            ->add('firstname', TextType::class, [
                'label' => 'Нэр',
                'attr' => ['class' => 'form-control'],
                'required' => true,
            ])
            ->add('phone', NumberType::class, [
                'label' => 'Утасны дугаар',
                'attr' => ['class' => 'form-control'],
                'required' => true,
                'invalid_message' => 'Утасны дугаар алдаатай байна!'
            ])
            ->add('email', EmailType::class, [
                'label' => 'Цахим шуудан',
                'attr' => ['class' => 'form-control'],
                'required' => true,
            ])
            ->add('amount', NumberType::class, [
                'label' => 'Төлбөр төлөх боломжит дүн',
                'attr' => ['class' => 'form-control'],
                'required' => true,
            ])
            ->add('type', ChoiceType::class, array(
                // 'required' => true,
                'attr' => ['class' => 'form-control'],
                'choices' => [
                    '1 жилийн эрчимжүүлсэн хөтөлбөр /Өвөл/' => '1 жилийн эрчимжүүлсэн хөтөлбөр /Өвөл/',
                    // 'CyberTech Хѳтѳлбѳр /1жил/' => 'CyberTech Хѳтѳлбѳр /1жил/',
                    //                    'Зуны хөтөлбөр /2-3 сар/' => 'Зуны хөтөлбөр /2-3 сар/',
                    //                    'UI / UX хөтөлбөр /1-2 сар/' => 'UI / UX хөтөлбөр /1-2 сар/',
                    //                    'Unity 3D Mobile Game Development Course' => 'Unity 3D Mobile Game Development Course /3 сар/',
                ],
            ))
            ->add('comment', TextareaType::class, [
                'label' => 'Санал хүсэлт',
                'attr' => ['class' => 'form-control'],
                'required' => false,
            ])
            ->getForm();

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            $regUser = new RegUsers();
            $regUser->setFirstName($form['firstname']->getData());
            $regUser->setLastName($form['lastname']->getData());
            $regUser->setEmail($form['email']->getData());
            $regUser->setPhoneNumber($form['phone']->getData());
            $regUser->setType($form['type']->getData());
            $regUser->setComment($form['comment']->getData() ? $form['comment']->getData() : '');

            $em->persist($regUser);
            $email = (new TemplatedEmail())
                ->from(new Address('admin@ioi.mn', 'iO Institute NGO'))
                ->to('orgil@iotech.mn')
                ->subject('Бүртгэл')
                ->html('Овог:  ' . $form['lastname']->getData() . '
                    <br>Нэр:  ' . $form['firstname']->getData() . '
                    <br>Утасны дугаар:  ' . $form['phone']->getData() . '
                    <br>Имэйл:  ' . $form['email']->getData() . '
                    <br>Төрөл:  ' . $form['type']->getData() . '
                    <br>Санал хүсэлт:  ' . $form['comment']->getData());

            $emailStudent = (new TemplatedEmail())
                ->from(new Address('admin@ioi.mn', 'iO Institute NGO'))
                ->to($form['email']->getData())
                ->subject('Амжилттай бүртгэгдлээ')
                ->htmlTemplate('emails/general_request.html.twig')
                ->context([
                    'username' => $form['firstname']->getData(),
                ]);


            $description = $regUser->getLastName() . " " .
                $regUser->getFirstName() . " " . $regUser->getPhoneNumber();
            $payment = new Payment();
            $payment->setPaymentCode($regUser->getPhoneNumber());
            $payment->setRegUser($regUser);
            $payment->setPaymentType('null');
            $payment->setAmount($form['amount']->getData());
            $payment->setState(Payment::STATE_NOT_PAID);
            $payment->setDescription($description);
            $payment->setTimeCreated(new \DateTime('now'));
            $em->persist($payment);
            $invoice = new PaymentInvoice();
            $invoice->setPayment($payment);
            $invoice->setInvoiceCode($payment->getId() . time());
            $invoice->setAmount($payment->getAmount());
            $invoice->setTimeCreated(new \DateTime('now'));
            $invoice->setState(PaymentInvoice::STATE_NOT_PAID);
            $em->persist($invoice);
            $em->flush();
            $invoiceData = $qPay->createInvoice($invoice);
            $qrCode = $invoiceData['qr_image'];
            $invoiceId = $invoice->getId();


            try {
                $mailer->send($email);
                $mailer->send($emailStudent);
                $this->addFlash('success', 'Амжилттай');
            } catch (TransportException $e) {
                return $this->redirectToRoute('payment_index', ['status' => 'error']);
            }
            return $this->redirectToRoute('payment_index', ['status' => 'success', 'qrCode' => $qrCode, 'invoiceId' => $invoiceId]);
        }
        if ($status === 'success') {
            $message = 'Таны бүртгэл амжилттай хийгдлээ. Баталгаажуулах бол доорх QR уншуулж төлбөрөө төлнө үү?';
        } elseif ($status === 'error') {
            $message = 'Бүртгэл хийгдэх явцад алдаа гарлаа. Та түр хүлээгээд дахин оролдоно уу.';
        } else {
            $message = '';
        }
        return $this->render('pages/payment.html.twig', [
            'form' => $form->createView(),
            'msg' => $message,
            'qrCode' => $qrCode,
            'invoiceId' => $invoiceId,
            'status' => $status
        ]);
    }
    /**
     * @Route("/check_index", name="check_index")
     */
    public function check(
        Request $request,
        EntityManagerInterface $em,
        PaymentInvoiceRepository $paymentInvoiceRepository,
        EventDispatcherInterface $eventDispatcher,
        Qpay $qPay,
        MailerInterface $mailer
    ): Response {
        $invoiceId = $request->query->get('invoiceId');
        $qrCode = $request->query->get('qrCode');

        $email = null;
        $emailStudent = null;
        $invoice = $paymentInvoiceRepository->find($invoiceId);
        if (!$invoice) {
            return new Response("Invoice not found", 404);
        }

        $stateOld = $invoice->getState();

        $invoice = $qPay->checkPaymentInvoice($invoice);
        // $form = $this->createFormBuilder()
        //     ->setMethod('GET')
        //     ->add('lastname', TextType::class, [
        //         'label' => 'Овог',
        //         'attr' => ['class' => 'form-control'],
        //         'required' => true,
        //     ])
        //     ->add('firstname', TextType::class, [
        //         'label' => 'Нэр',
        //         'attr' => ['class' => 'form-control'],
        //         'required' => true,
        //     ])
        //     ->add('phone', NumberType::class, [
        //         'label' => 'Утасны дугаар',
        //         'attr' => ['class' => 'form-control'],
        //         'required' => true,
        //         'invalid_message' => 'Утасны дугаар алдаатай байна!'
        //     ])
        //     ->add('email', EmailType::class, [
        //         'label' => 'Цахим шуудан',
        //         'attr' => ['class' => 'form-control'],
        //         'required' => true,
        //     ])
        //     ->add('amount', NumberType::class, [
        //         'label' => 'Төлбөр төлөх боломжит дүн',
        //         'attr' => ['class' => 'form-control'],
        //         'required' => true,
        //     ])
        //     ->add('type', ChoiceType::class, array(
        //         // 'required' => true,
        //         'attr' => ['class' => 'form-control'],
        //         'choices' => [
        //             'CyberTech Хѳтѳлбѳр /1жил/' => 'CyberTech Хѳтѳлбѳр /1жил/',
        //             //                    'Зуны хөтөлбөр /2-3 сар/' => 'Зуны хөтөлбөр /2-3 сар/',
        //             //                    'UI / UX хөтөлбөр /1-2 сар/' => 'UI / UX хөтөлбөр /1-2 сар/',
        //             //                    'Unity 3D Mobile Game Development Course' => 'Unity 3D Mobile Game Development Course /3 сар/',
        //         ],
        //     ))
        //     ->add('comment', TextareaType::class, [
        //         'label' => 'Санал хүсэлт',
        //         'attr' => ['class' => 'form-control'],
        //         'required' => false,
        //     ])
        //     ->getForm();


        if ($invoice->getState() === PaymentInvoice::STATE_PAID && $stateOld !== PaymentInvoice::STATE_PAID) {
            $payment = $invoice->getPayment();
            if ($payment && $payment->getState() !== Payment::STATE_PAID) {
                $user = $payment->getRegUser();

                $payment->setState(Payment::STATE_PAID);
                $payment->setTimePaid(new \DateTime('now'));
                $payment->setAmountPaid($invoice->getAmount());

                $email = (new TemplatedEmail())
                    ->from(new Address('admin@ioi.mn', 'iO Institute NGO'))
                    ->to('orgil.b@ufenu.edu.mn')
                    ->subject('Бүртгэл')
                    ->html($payment->getDescription() . '
                хэрэглэгчийн ' . $invoice->getAmount() . '₮-ийн төлбөр амжилттай төлөгдлөө.');

                $emailStudent = (new TemplatedEmail())
                    ->from(new Address('admin@ioi.mn', 'iO Institute NGO'))
                    ->to($user->getEmail())
                    ->subject('Таны бүртгэл амжилттай баталгаажлаа!')
                    ->htmlTemplate('emails/general_request.html.twig')
                    ->context([
                        'username' => $user->getFirstName(),

                    ]);

                $em->flush();

                $event = new PaymentEvent($payment);
                $eventDispatcher->dispatch($event, PaymentEvent::PAID);

                $mailer->send($email);
                $mailer->send($emailStudent);
            }
        }

        if (isset($invoice->getExtra()['payment_status']) && $invoice->getExtra()['payment_status'] === 'PAID') {
            return $this->render('payment/success.html.twig');
        } else {
            return $this->render('pages/payment.html.twig', [

                'msg' => 'Төлөгдөөгүй байна хэсэг хугацааны дараа дарна уу!',
                'invoiceId' => $invoiceId,
                'status' => 'success'
            ]);
        }
    }


    /**
     * @Route("/about-us", name="about_us_index")
     */
    public function about(Request $request)
    {
        return $this->render('pages/about.html.twig');
    }

    /**
     * @Route("/contact", name="contact_index")
     */
    public function contact(Request $request, MailerInterface $mailer)
    {
        $status = $request->get('status');

        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();

        $form = $this->createFormBuilder()
            ->setMethod('GET')
            ->add('lastname', TextType::class, [
                'label' => 'Овог',
                'attr' => ['class' => 'form-control'],
                'required' => true,
            ])
            ->add('firstname', TextType::class, [
                'label' => 'Нэр',
                'attr' => ['class' => 'form-control'],
                'required' => true,
            ])
            ->add('phone', NumberType::class, [
                'label' => 'Утасны дугаар',
                'attr' => ['class' => 'form-control'],
                'required' => true,
                'invalid_message' => 'Утасны дугаар алдаатай байна!'
            ])
            ->add('email', EmailType::class, [
                'label' => 'Цахим шуудан',
                'attr' => ['class' => 'form-control'],
                'required' => true,
            ])
            ->add('type', ChoiceType::class, array(
                'required' => true,
                'attr' => ['class' => 'form-control'],
                'choices' => [
                    '1 жилийн эрчимжүүлсэн хөтөлбөр /Өвөл/' => '1 жилийн эрчимжүүлсэн хөтөлбөр /Өвөл/',
                    // 'CyberTech Хѳтѳлбѳр /1жил/' => 'CyberTech Хѳтѳлбѳр /1жил/',
                    //                    'Зуны хөтөлбөр /2-3 сар/' => 'Зуны хөтөлбөр /2-3 сар/',
                    //                    'UI / UX хөтөлбөр /1-2 сар/' => 'UI / UX хөтөлбөр /1-2 сар/',
                    //                    'Unity 3D Mobile Game Development Course' => 'Unity 3D Mobile Game Development Course /3 сар/',
                ],
            ))
            ->add('comment', TextareaType::class, [
                'label' => 'Санал хүсэлт',
                'attr' => ['class' => 'form-control'],
                'required' => false,
            ])
            ->getForm();

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            $register = new RegUsers();
            $register->setFirstName($form['firstname']->getData());
            $register->setLastName($form['lastname']->getData());
            $register->setEmail($form['email']->getData());
            $register->setPhoneNumber($form['phone']->getData());
            $register->setType($form['type']->getData());
            $register->setComment($form['comment']->getData() ? $form['comment']->getData() : '');
            $em->persist($register);
            $em->flush();

            $email = (new TemplatedEmail())
                ->from(new Address('admin@ioi.mn', 'iO Institute NGO'))
                ->to('orgil.b@ufenu.edu.mn')
                ->subject('Бүртгэл')
                ->html('Овог:  ' . $form['lastname']->getData() . '
                        <br>Нэр:  ' . $form['firstname']->getData() . '
                        <br>Утасны дугаар:  ' . $form['phone']->getData() . '
                        <br>Имэйл:  ' . $form['email']->getData() . '
                        <br>Төрөл:  ' . $form['type']->getData() . '
                        <br>Санал хүсэлт:  ' . $form['comment']->getData());

            $emailStudent = (new TemplatedEmail())
                ->from(new Address('admin@ioi.mn', 'iO Institute NGO'))
                ->to($register->getEmail())
                ->subject('Амжилттай бүртгэгдлээ')
                ->htmlTemplate('emails/general_request.html.twig')
                ->context([
                    'username' => $register->getFirstName(),
                ]);

            try {
                $mailer->send($email);
                $mailer->send($emailStudent);
                $this->addFlash('success', 'Амжилттай');
            } catch (TransportException $e) {
                return $this->redirectToRoute('contact_index', ['status' => 'error']);
            }
            return $this->redirectToRoute('contact_index', ['status' => 'success']);
        }

        if ($status === 'success') {
            $message = 'Таны бүртгэл амжилттай хийгдлээ. Бүртгэл баталгаажуулах үйл ажиллагаа эхлэх үед бид тантай холбогдох болно.';
        } elseif ($status === 'error') {
            $message = 'Бүртгэл хийгдэх явцад алдаа гарлаа. Та түр хүлээгээд дахин оролдоно уу.';
        } else {
            $message = '';
        }

        return $this->render('pages/contact.html.twig', [
            'form' => $form->createView(),
            'msg' => $message,
            'status' => $status
        ]);
    }
}
