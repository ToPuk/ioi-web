<?php

namespace App\Entity;

use App\Repository\PaymentLogRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PaymentLogRepository::class)
 */
class PaymentLog
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Payment::class)
     * @Groups({"list"})
     */
    private $payment;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups({"list"})
     */
    private $state;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"list"})
     */
    private $note;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @Groups({"list"})
     */
    private $userCreated;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"list"})
     */
    private $timeCreated;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getNote(): ?string
    {
        return $this->note;
    }

    public function setNote(string $note): self
    {
        $this->note = $note;

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
}
