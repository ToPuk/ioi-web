<?php

namespace App\Entity;

use App\Repository\PaymentInvoiceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PaymentInvoiceRepository::class)
 */

class PaymentInvoice
{
    public const STATE_PAID = "PAID";
    public const STATE_NOT_PAID = "NOT_PAID";
    public const STATE_CANCELED = "CANCELED";
    public const STATE_DECLINED = "DECLINED";


    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"list", "pi"})
     */
    private ?int $id;

    /**
     * @ORM\ManyToOne(targetEntity=Payment::class)
     * @Groups({"list", "pi"})
     */
    private ?Payment $payment;

    /**
     * @ORM\Column(type="string", length=30, unique=true)
     * @Groups({"list", "pi"})
     */
    private ?string $invoiceCode;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"list", "pi"})
     */
    private ?string $channel;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"list", "pi"})
     */
    private ?int $amount;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups({"list", "pi"})
     */
    private ?string $state;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"list", "pi"})
     */
    private ?\DateTimeInterface $timeCreated;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private ?\DateTimeInterface $timePaid;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private ?string $merchantInvoiceId;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $extra;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPayment(): ?Payment
    {
        return $this->payment;
    }

    public function setPayment(?Payment $payment): self
    {
        $this->payment = $payment;

        return $this;
    }

    public function getChannel(): ?string
    {
        return $this->channel;
    }

    public function setChannel(string $channel): self
    {
        $this->channel = $channel;

        return $this;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): self
    {
        $this->state = $state;

        return $this;
    }

    public function getTimeCreated(): ?\DateTimeInterface
    {
        return $this->timeCreated;
    }

    public function setTimeCreated(\DateTimeInterface $timeCreated): self
    {
        $this->timeCreated = $timeCreated;

        return $this;
    }

    public function getTimePaid(): ?\DateTimeInterface
    {
        return $this->timePaid;
    }

    public function setTimePaid(?\DateTimeInterface $timePaid): self
    {
        $this->timePaid = $timePaid;

        return $this;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getInvoiceCode(): ?string
    {
        return $this->invoiceCode;
    }

    public function setInvoiceCode(string $invoiceCode): self
    {
        $this->invoiceCode = $invoiceCode;

        return $this;
    }

    public function getMerchantInvoiceId(): ?string
    {
        return $this->merchantInvoiceId;
    }

    public function setMerchantInvoiceId(string $merchantInvoiceId): self
    {
        $this->merchantInvoiceId = $merchantInvoiceId;

        return $this;
    }

    public function getExtra(): ?array
    {
        return $this->extra;
    }

    public function setExtra(array $extra): self
    {
        $this->extra = $extra;

        return $this;
    }
}
