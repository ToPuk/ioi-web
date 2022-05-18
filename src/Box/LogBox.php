<?php


namespace App\Box;


use App\Entity\UserActivityLog;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class LogBox
{
    /**
     * @var EntityManagerInterface
     */
    protected $em;

//    public function __construct(EntityManagerInterface $em)
//    {
//        $this->em = $em;
//    }

    public function addLog(User $user, string $type, array $payload,EntityManagerInterface $em) {
        $this->em = $em;
        $activityLog = new UserActivityLog();
        $activityLog->setActivityDate(new \DateTime('now'));
        $activityLog->setUserEmail($user->getEmail());
        $activityLog->setUserId($user->getId());
        $activityLog->setActivityType($type);
        $activityLog->setData($payload);
        $this->em->persist($activityLog);
        $this->em->flush();
    }

}