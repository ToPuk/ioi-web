<?php

namespace App\Controller;

use App\Box\ValidatorBox;
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
            /** @var EMBaiguullaga $emb */
            $emb = $form['emb']->getData();
            $logger->info('register-request-'.$user->getEmail(), array('emb_id'=>$emb->getId(), 'emb_reg'=>$emb->getRegNum() ,'user'=>$user));
            $olduser = $entityManager->getRepository(User::class)->findOneBy(array('email'=>$user->getEmail()));
            if ($olduser) {

                return $this->render('registration/register.html.twig', [
                    'registrationForm' => $form->createView(),
                    'alert' => 'Уг и-мэйл дээр хэрэглэгч бүртгэгдсэн байна'
                ]);
            }

            if (!$emb) {

                return $this->render('registration/register.html.twig', [
                    'registrationForm' => $form->createView(),
                    'alert' => 'Мэдээллийн сангаас тухайн байгууллагын мэдээлэл олдсонгүй. Та байгууллагын регистрийн дугаараа шалгана уу. Регистр зөв боловч бүртгэл үүсэхгүй бол  70101153, 70101159, 70101116 дугаарт холбогдоно уу.'
                ]);
            }

            $hospital = $entityManager->getRepository(Hospital::class)->findOneBy(array('emb'=>$emb));

            if ($hospital != null) {
                $hospitalUsers = $entityManager->getRepository(User::class)->findBy(array('hospital'=>$hospital));
                if (count($hospitalUsers) > 2) {

                    return $this->render('registration/register.html.twig', [
                        'registrationForm' => $form->createView(),
                        'alert' => 'Уг эмнэлэг дээр 3-с илүү хэрэглэгч бүртгэх боломжгүй байна.'
                    ]);
                }
            }

            $validatorBox = new ValidatorBox($entityManager);
            $result = $validatorBox->checkLicense($emb);

            if($result['status'] != 'ok'){

                return $this->render('registration/register.html.twig', [
                    'registrationForm' => $form->createView(),
                    'alert' => 'Бүртгэл үүсгэхэд алдаа гарлаа та дахин оролдоно уу!'
                ]);
            }
            $hospital = $entityManager->getRepository(Hospital::class)->findOneBy(array('emb'=>$emb));
            // encode the plain password
            $user->setPassword(
                $userPasswordEncoderInterface->encodePassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            );
            $user->addRole('ROLE_HOSPITAL');
            $user->setHospital($hospital);
            if (!$entityManager->isOpen()) {
                $entityManager = $this->getDoctrine()->getManager();
            }
            $entityManager->persist($user);
            $entityManager->flush();


            $filePath = $this->param->get('kernel.project_dir') . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "assets". DIRECTORY_SEPARATOR . "excel". DIRECTORY_SEPARATOR ."hr_equipment.xlsx";
            $toMailAddress = [];

//            array_push($toMailAddress, new Address('amgaa36@yahoo.com'));
            array_push($toMailAddress, new Address('selection.1818.mn@gmail.com'));

            // generate a signed url and email it to the user
            $this->emailVerifier->sendEmailConfirmation('app_verify_email', $user,
                (new TemplatedEmail())
                    ->from(new Address('selection@1818.mn', 'Эрүүл Мэндийн Даатгалын Ерөнхий Газар'))
                    ->to($user->getEmail())
                    ->addBcc(...$toMailAddress)
                    ->subject('Цахим шуудангийн хаяг баталгаажуулалт')
                    ->attachFromPath($filePath)
                    ->htmlTemplate('registration/confirmation_email.html.twig')
            );

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
    public function action(Request $request,MailerInterface $mailer): Response
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

        return $this->redirectToRoute('app_register',['msg'=>'success']);
    }

    /**
     * @Route("/register", name="register_index")
     */
    public function index(Request $request, MailerInterface $mailer): Response
    {
        $status = $request->get('status');

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
                    'Кодчиллын эрчимжүүлсэн хөтөлбөр /1 жил/' => 'Кодчиллын эрчимжүүлсэн хөтөлбөр /1 жил/',
                    'Зуны хөтөлбөр /2-3 сар/' => 'Зуны хөтөлбөр /2-3 сар/',
                    'UI / UX хөтөлбөр /1-2 сар/' => 'UI / UX хөтөлбөр /1-2 сар/',
                ],
            ))
            ->add('comment', TextareaType::class, [
                'label' => 'Санал хүсэлт',
                'attr' => ['class' => 'form-control'],
                'required' => false,
            ])
            ->getForm()
        ;

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            $email = (new TemplatedEmail())
                ->from(new Address('admin@ioi.mn', 'iO Institute'))
                ->to('orgil@iotech.mn')
                ->subject('Бүртгэл')
                ->html('Овог:  '.$form['lastname']->getData().'
                        <br>Нэр:  '.$form['firstname']->getData().'
                        <br>Утасны дугаар:  '.$form['phone']->getData().'
                        <br>Имэйл:  '.$form['email']->getData().'
                        <br>Төрөл:  '.$form['type']->getData().'
                        <br>Санал хүсэлт:  '.$form['comment']->getData())
            ;
            try {
                $mailer->send($email);
            } catch (TransportException $e) {
                return $this->redirectToRoute('register_index',['status'=>'error']);
            }
            return $this->redirectToRoute('register_index',['status'=>'success']);
        }

        if($status === 'success'){
            $message = 'Таны бүртгэл амжилттай хийгдлээ. Үндсэн элсэлтийн үйл ажиллагаа эхлэх үед бид тантай холбогдох болно.';
        }elseif ($status === 'error'){
            $message = 'Бүртгэл хийгдэх явцад алдаа гарлаа. Та түр хүлээгээд дахин оролдоно уу.';
        }else{
            $message = '';
        }

        return $this->render('registration/index.html.twig',[
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

            $logger->info('verify-email-'.$user->getEmail(), ['user'=>$user]);
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
    public function checkEmail(){
        return $this->render('registration/check_email.html.twig');
    }
}
