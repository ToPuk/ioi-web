<?php

namespace App\Entity;

use App\Repository\PaymentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PaymentRepository")
 */
class Payment
{
    public const STATE_PAID = "PAID";
    public const STATE_NOT_PAID = "NOT_PAID";

    public const TYPE_ADMISSION_REGISTER = "admission_register";
    public const TYPE_ADMISSION_CREDIT = "admission_credit";

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"list", "au", "p"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=RegUsers::class)
     * @Groups({"list", "p"})
     */
    private $regUser;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups({"list", "au", "p"})
     */
    private $paymentType;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups({"list", "au", "p"})
     */
    private $paymentCode;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"list", "au", "p"})
     */
    private $amount;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"list", "au", "p"})
     */
    private $amountPaid;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"list", "au", "p"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"list", "au", "p"})
     */
    private $note;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups({"list", "au", "p"})
     */
    private $state;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @Groups({"list", "au", "p"})
     */
    private $userCreated;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"list", "au", "p"})
     */
    private $timeCreated;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"list", "au", "p"})
     */
    private $timePaid;

    /**
     * @ORM\ManyToOne(targetEntity=PaymentLog::class)
     */
    private $lastLog;

    /**
     * @ORM\OneToMany(targetEntity=PaymentInvoice::class, mappedBy="payment")
     */
    private $paymentInvoices;

    public function __construct()
    {
        $this->amount = null;
        $this->paymentInvoices = new ArrayCollection();
    }

    public function getPaymentInvoices(): Collection
    {
        return $this->paymentInvoices;
    }

    public function addPaymentInvoice(PaymentInvoice $paymentInvoice): self
    {
        if (!$this->paymentInvoices->contains($paymentInvoice)) {
            $this->paymentInvoices[] = $paymentInvoice;
            $paymentInvoice->setPayment($this);
        }

        return $this;
    }

    public function removePaymentInvoice(PaymentInvoice $paymentInvoice): self
    {
        if ($this->paymentInvoices->removeElement($paymentInvoice)) {
            // Set the owning side to null (unless already changed)
            if ($paymentInvoice->getPayment() === $this) {
                $paymentInvoice->setPayment(null);
            }
        }

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPaymentType(): ?string
    {
        return $this->paymentType;
    }

    public function setPaymentType(string $paymentType): self
    {
        $this->paymentType = $paymentType;

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

    public function getAmountPaid(): ?int
    {
        return $this->amountPaid;
    }

    public function setAmountPaid(int $amountPaid): self
    {
        $this->amountPaid = $amountPaid;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

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

    public function setTimeCreated(?\DateTimeInterface $timeCreated): self
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

    public function getUserCreated(): ?User
    {
        return $this->userCreated;
    }

    public function setUserCreated(?User $userCreated): self
    {
        $this->userCreated = $userCreated;

        return $this;
    }

    public function getPaymentCode(): ?string
    {
        return $this->paymentCode;
    }

    public function setPaymentCode(string $paymentCode): self
    {
        $this->paymentCode = $paymentCode;

        return $this;
    }

    public function getRegUser(): ?RegUsers
    {
        return $this->regUser;
    }

    public function setRegUser(?RegUsers $regUser): self
    {
        $this->regUser = $regUser;

        return $this;
    }

    public function getLastLog(): ?PaymentLog
    {
        return $this->lastLog;
    }

    public function setLastLog(?PaymentLog $lastLog): self
    {
        $this->lastLog = $lastLog;

        return $this;
    }

    public function getNote(): ?string
    {
        return $this->note;
    }

    public function setNote(string $note): self
    {
        $this->note = $note;

        return $this;
    }
}
