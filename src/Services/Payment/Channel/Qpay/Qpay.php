<?php

namespace App\Services\Payment\Channel\Qpay;

use App\Entity\RegUsers;
use App\Entity\Payment;
use App\Entity\PaymentInvoice;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class Qpay
{
    //    const URL_BASE = "https://merchant-sandbox.qpay.mn/v2";
    //    const URL_BASE = "https://merchant-sandbox.qpay.mn/v2/auth/token";

    public const CHANNEL_NAME = 'qpay';
    public const URL_BASE = "https://merchant.qpay.mn/v2";

    protected UrlGeneratorInterface $router;

    protected EntityManagerInterface $em;

    protected string $username;

    protected string $password;

    protected string $invoiceCode;

    public function __construct(
        EntityManagerInterface $em,
        UrlGeneratorInterface $router
    ) {
        $this->router = $router;
        $this->em = $em;

        $this->username = "IO_INSTITUTE";
        $this->password = "6lNUTDsH";
        $this->invoiceCode = "IO_INSTITUTE_INVOICE";

        // $this->username = "TEST_MERCHANT";
        // $this->password = "123456";
        // $this->invoiceCode = "TEST_INVOICE";
    }

    function createToken()
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => self::URL_BASE . '/auth/token',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_USERPWD => $this->username . ":" . $this->password,
            //            CURLOPT_HTTPHEADER => array(
            //                'Authorization: Basic VEVTVF9NRVJDSEFOVDoxMjM0NTY=',
            //            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        return json_decode($response, true);
    }

    public function createInvoice(PaymentInvoice $paymentInvoice)
    {
        $url = self::URL_BASE . '/invoice';
        $request = array(
            'invoice_code' => $this->invoiceCode,
            'sender_invoice_no' => $paymentInvoice->getInvoiceCode(),
            'invoice_receiver_code' => 'terminal',
            'invoice_description' => $paymentInvoice->getPayment()->getDescription(),
            'amount' => $paymentInvoice->getAmount(),
            'callback_url' => "http://" . $_SERVER['HTTP_HOST'] . $this->router->generate('api_payment_invoice_check', [
                'invoiceCode' => $paymentInvoice->getInvoiceCode(),
                'is_webhook' => 'yes',
            ]),
        );
        $qpayRes = $this->curl($url, $request);
        $paymentInvoice->setMerchantInvoiceId($qpayRes['invoice_id']);
        $paymentInvoice->setExtra($qpayRes);
        $this->em->flush();
        return $qpayRes;
    }

    public function checkInvoiceGet($order_id)
    {
        $token = $this->createToken();
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => self::URL_BASE . '/invoice/' . $order_id,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_HTTPHEADER => array(
                'Authorization: Bearer ' . $token['access_token'],
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);

        return json_decode($response, true);
    }

    public function checkInvoice($order_id)
    {
        $url = self::URL_BASE . '/payment/check';
        $request = array(
            'object_type' => 'INVOICE',
            'object_id' => $order_id,
            'offset' =>
            array(
                'page_number' => 1,
                'page_limit' => 100,
            ),
        );
        return $this->curl($url, $request);
    }

    function curl($url, $request)
    {
        $token = $this->createToken();
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($request),
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_HTTPHEADER => array(
                'Authorization: Bearer ' . $token['access_token'],
                'Content-Type: application/json',
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return json_decode($response, true);
    }


    /*
[
"payment_id" => "283894225628713"
"payment_status" => "PAID"
"payment_amount" => "200.00"
"trx_fee" => "0.00"
"payment_currency" => "MNT"
"payment_wallet" => "Төрийн банк апп"
"payment_type" => "P2P"
"next_payment_date" => null
"next_payment_datetime" => null
"card_transactions" => []
"p2p_transactions" => array:1 [
0 => array:8 [
"transaction_bank_code" => "340000"
"account_bank_code" => "050000"
"account_bank_name" => "Төрийн банк"
"account_number" => "5926401325"
"status" => "SUCCESS"
"amount" => "200.00"
"currency" => "MNT"
"settlement_status" => "SETTLED"
]
]
]
*/

    public function checkPaymentInvoice(PaymentInvoice $invoice): PaymentInvoice
    {
        if ($invoice->getState() !== PaymentInvoice::STATE_NOT_PAID) {
            return $invoice;
        }

        $qPayment = $this->checkInvoice($invoice->getMerchantInvoiceId());
        if (!(is_array($qPayment) && count($qPayment['rows']) > 0)) {
            return $invoice;
        }

        $qPayment = $qPayment['rows'][0];

        if ($qPayment['payment_status'] === 'PAID') {

            $invoice->setState(PaymentInvoice::STATE_PAID);
            $invoice->setAmount($qPayment['payment_amount']);
            $invoice->setTimePaid(new \DateTime('now'));
        } elseif ($qPayment['payment_status'] === 'VOIDED') {
            $invoice->setState(PaymentInvoice::STATE_DECLINED);
        } else {
            $invoice->setState(PaymentInvoice::STATE_CANCELED);
        }

        $invoice->setExtra((array)$qPayment);
        $this->em->flush();

        return $invoice;
    }
}
