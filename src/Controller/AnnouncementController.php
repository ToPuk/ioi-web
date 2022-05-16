<?php

namespace App\Controller;

use App\Entity\Announcement;
use App\Entity\RequestGeneral;
use App\Entity\User;
use App\Form\AnnouncementType;
use App\Repository\AnnouncementRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

/**
 * @Route("/announcement")
 */
class AnnouncementController extends AbstractController
{


    private $serializer;

    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    public function __construct(SerializerInterface $serializer, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->serializer = $serializer;
        $this->passwordEncoder = $passwordEncoder;
    }



    /**
     * @Route("/", name="announcement_index", methods={"GET"})
     */
    public function index(AnnouncementRepository $announcementRepository): Response
    {

        $qb = $announcementRepository->createQueryBuilder('p');
        $qb->andWhere('p.releaseDate <= :releaseDate')
            ->setParameter('releaseDate', new \DateTime('now'));

        $announcements = $qb
            ->getQuery()
            ->getResult();

        return $this->render('announcement/index.html.twig', [
            'announcements' => $announcements,
        ]);
    }

    /**
     * @Route("/create_user", name="announcement_create_user_manually", methods={"GET"})
     */
    public function generateUser(): Response{

        $user = new User();
        $user->setEmail('amgaa36@gmail.com');
        $user->setFirstName('Энх-Амгалан');
        $user->setLastName('Энхмандал');
        $user->setPassword('123456789');
        $user->setRoles(['ROLE_USER']);
        $user->setPassword($this->passwordEncoder->encodePassword($user, '123456789'));
        $manager = $this->getDoctrine()->getManager();
        $manager->persist($user);
//        dump($user);
//        exit();

//        return new JsonResponse(array('test'=>'test'));
        $manager->flush();
        return new JsonResponse(array('test'=>'test'));
    }


    /**
     * @Route("/send_email", name="send_email", methods={"GET"})
     */
    public function sendEmail(MailerInterface $mailer): Response{
        $email = (new Email())
            ->from('noreply@emd.gov.mn')
            ->to('amgaa36@gmail.com')
            //->cc('cc@example.com')
            //->bcc('bcc@example.com')
            //->replyTo('fabien@example.com')
            //->priority(Email::PRIORITY_HIGH)
            ->subject('Time for Symfony Mailer!')
            ->text('Sending emails is fun again!')
            ->html('<p>See Twig integration for better HTML integration!</p>');

        $mailer->send($email);

//        return new JsonResponse(array('test'=>'test'));
        return new JsonResponse(array('test'=>'test'));
    }

    /**
     * @param User $entity
     */
    private function encodeUserPassword($entity): void
    {
        $entity->setPassword(
            $this->passwordEncoder->encodePassword(
                $entity,
                $entity->getPassword()
            )
        );


    }

    /**
     * @Route("/new", name="announcement_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $announcement = new Announcement();
        $form = $this->createForm(AnnouncementType::class, $announcement);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();

//            $sql = "ALTER SESSION SET NLS_TIME_FORMAT = 'HH24:MI:SS' NLS_DATE_FORMAT = 'YYYY-MM-DD HH24:MI:SS' NLS_TIMESTAMP_FORMAT = 'YYYY-MM-DD HH24:MI:SS' NLS_TIMESTAMP_TZ_FORMAT = 'YYYY-MM-DD HH24:MI:SS TZH:TZM'";
//            $conn = $entityManager->getConnection();
//            $stmt = $conn->prepare($sql);
//            $stmt->execute();

            $announcement->setCreatedDate(new \DateTime('now'));
            $entityManager->persist($announcement);
            $entityManager->flush();

            return $this->redirectToRoute('announcement_index');
        }

        return $this->render('announcement/new.html.twig', [
            'announcement' => $announcement,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="announcement_show", methods={"GET"})
     */
    public function show(Announcement $announcement): Response
    {
        return $this->render('announcement/show.html.twig', [
            'announcement' => $announcement,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="announcement_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Announcement $announcement): Response
    {
        $form = $this->createForm(AnnouncementType::class, $announcement);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('announcement_index');
        }

        return $this->render('announcement/edit.html.twig', [
            'announcement' => $announcement,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="announcement_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Announcement $announcement): Response
    {
        if ($this->isCsrfTokenValid('delete'.$announcement->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($announcement);
            $entityManager->flush();
        }

        return $this->redirectToRoute('announcement_index');
    }
}
