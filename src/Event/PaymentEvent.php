<?php

namespace App\Event;

use App\Entity\Payment;
use Symfony\Contracts\EventDispatcher\Event;

class PaymentEvent extends Event
{

    public const NAME = 'payment';
    public const CREATED = 'payment.created';
    public const PAID = 'payment.paid';

    protected ?Payment $payment;

    public function __construct(Payment $payment)
    {
        $this->payment = $payment;
    }

    public function getPayment(): ?Payment
    {
        return $this->payment;
    }
}
