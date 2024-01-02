<?php

namespace App\Controller;

use App\Entity\RegUsers;
use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
use App\Security\EmailVerifier;
use Doctrine\ORM\EntityManager;
use Psr\Log\LoggerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportException;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Message;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;


class RegistrationController extends AbstractController
{
    private EmailVerifier $emailVerifier;

    /**
     * @var ParameterBagInterface
     */
    protected $param;

    public function __construct(EmailVerifier $emailVerifier, ParameterBagInterface $param)
    {
        $this->emailVerifier = $emailVerifier;
        $this->param = $param;
    }

    /**
     * @Route("/register2", name="app_register")
     */
    public function register(Request $request, UserPasswordEncoderInterface $userPasswordEncoderInterface, LoggerInterface $logger): Response
    {


        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);
        /** @var EntityManager $entityManager */
        $entityManager = $this->getDoctrine()->getManager();

        if ($form->isSubmitted() && $form->isValid()) {

            // encode the plain password
            $user->setPassword(
                $userPasswordEncoderInterface->encodePassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            );
            $user->addRole('ROLE_USER');
            if (!$entityManager->isOpen()) {
                $entityManager = $this->getDoctrine()->getManager();
            }
            $entityManager->persist($user);
            $entityManager->flush();

            // do anything else you need here, like send an email
            return $this->redirectToRoute('registration_check_email');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form->createView(),
            'alert' => null
        ]);
    }

    /**
     * @Route("/send-register", name="send_register")
     */
    public function action(Request $request, MailerInterface $mailer): Response
    {
        //        dump('hi');
        //        exit();
        $email = (new TemplatedEmail())
            ->from(new Address('admin@ioi.mn', 'test'))
            ->to('orgil@iotech.mn')
            ->subject('test')
            ->htmlTemplate('emails/result_general_request.html.twig')
            ->context([
                'msg' => 'Test',
                'description' => 'testtesttest sadsdadasdasd'
            ]);
        $mailer->send($email);

        return $this->redirectToRoute('app_register', ['msg' => 'success']);
    }

    /**
     * @Route("/register", name="register_index")
     */
    public function index(Request $request, MailerInterface $mailer): Response
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

            try {
                $mailer->send($email);
                $mailer->send($emailStudent);
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
    /**
     * @Route("/verify/email", name="app_verify_email")
     */
    public function verifyUserEmail(Request $request, UserRepository $userRepository, LoggerInterface $logger): Response
    {
        $id = $request->get('id');

        if (null === $id) {
            return $this->redirectToRoute('app_register');
        }

        $user = $userRepository->find($id);

        if (null === $user) {
            return $this->redirectToRoute('app_register');
        }

        // validate email confirmation link, sets User::isVerified=true and persists
        try {

            $logger->info('verify-email-' . $user->getEmail(), ['user' => $user]);
            $this->emailVerifier->handleEmailConfirmation($request, $user);
        } catch (VerifyEmailExceptionInterface $exception) {
            $this->addFlash('verify_email_error', $exception->getReason());

            return $this->redirectToRoute('app_register');
        }

        // @TODO Change the redirect on success and handle or remove the flash message in your templates
        $this->addFlash('success', 'Таны и-мэйл хаяг амжилттай баталгаажсан байна.');

        return $this->redirectToRoute('request_general_index');
    }

    /**
     * @Route("/check_email", name="registration_check_email")
     */
    public function checkEmail()
    {
        return $this->render('registration/check_email.html.twig');
    }
}
