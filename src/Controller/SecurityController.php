<?php

namespace App\Controller;

use App\Entity\Tender;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Psr\Log\LoggerInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        $em = $this->getDoctrine()->getManager();
        $qb = $em->getRepository(Tender::class)->createQueryBuilder('p');
        $qb->andWhere('p.endDate >= :endDate')
            ->setParameter('endDate', new \DateTime('now'));

        $tender = $qb
            ->orderBy('p.startDate', 'DESC')
            ->getQuery()
            ->getResult();
        return $this->render('default/index.html.twig', ['last_username' => $lastUsername, 'error' => $error, 'tender'=>$tender]);
//        return $this->redirectToRoute('default_index');
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
