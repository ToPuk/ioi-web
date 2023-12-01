<?php

namespace App\Repository;

use App\Entity\PaymentInvoice;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PaymentInvoice>
 *
 * @method PaymentInvoice|null find($id, $lockMode = null, $lockVersion = null)
 * @method PaymentInvoice|null findOneBy(array $criteria, array $orderBy = null)
 * @method PaymentInvoice[]    findAll()
 * @method PaymentInvoice[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PaymentInvoiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PaymentInvoice::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(PaymentInvoice $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(PaymentInvoice $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }
    public function findOneByMerchantInvoiceId($invoiceId)
    {
        return $this->findOneBy(['merchantInvoiceId' => $invoiceId]);
    }

    // /**
    //  * @return PaymentInvoice[] Returns an array of PaymentInvoice objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PaymentInvoice
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
