<?php

namespace App\Controller;

use App\Entity\RegUsers;
use Doctrine\ORM\EntityManager;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\Exception\TransportException;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

/**
 * @Route("/")
 */
class DefaultController extends AbstractController
{

    /**
     * @Route("/", name="default_index")
     */
    public function indexAction(Request $request)
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/contact", name="contact_index")
     */
    public function contact(Request $request, MailerInterface $mailer)
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
                    'CyberTech Хѳтѳлбѳр /1жил/' => 'CyberTech Хѳтѳлбѳр /1жил/',
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
            ->getForm()
        ;

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            $register = new RegUsers();
            $register->setFirstName($form['firstname']->getData());
            $register->setLastName($form['lastname']->getData());
            $register->setEmail($form['email']->getData());
            $register->setPhoneNumber($form['phone']->getData());
            $register->setType($form['type']->getData());
            $register->setComment($form['comment']->getData()?$form['comment']->getData():'');
            $em->persist($register);
            $em->flush();

            $email = (new TemplatedEmail())
                ->from(new Address('admin@ioi.mn', 'iO Institute NGO'))
                ->to('orgil@iotech.mn')
                ->subject('Бүртгэл')
                ->html('Овог:  '.$form['lastname']->getData().'
                        <br>Нэр:  '.$form['firstname']->getData().'
                        <br>Утасны дугаар:  '.$form['phone']->getData().'
                        <br>Имэйл:  '.$form['email']->getData().'
                        <br>Төрөл:  '.$form['type']->getData().'
                        <br>Санал хүсэлт:  '.$form['comment']->getData())
            ;

            $emailStudent = (new TemplatedEmail())
                ->from(new Address('admin@ioi.mn', 'iO Institute NGO'))
                ->to($form['email']->getData())
                ->subject('Амжилттай бүртгэгдлээ')
                ->htmlTemplate('emails/general_request.html.twig')
                ->context([
                    'username' => $form['firstname']->getData(),
                ])
            ;

            try {
                $mailer->send($email);
                $mailer->send($emailStudent);
                $this->addFlash('success', 'Амжилттай');
            } catch (TransportException $e) {
                return $this->redirectToRoute('contact_index',['status'=>'error']);
            }
            return $this->redirectToRoute('contact_index',['status'=>'success']);
        }

        if($status === 'success'){
            $message = 'Таны бүртгэл амжилттай хийгдлээ. Бүртгэл баталгаажуулах үйл ажиллагаа эхлэх үед бид тантай холбогдох болно.';
        }elseif ($status === 'error'){
            $message = 'Бүртгэл хийгдэх явцад алдаа гарлаа. Та түр хүлээгээд дахин оролдоно уу.';
        }else{
            $message = '';
        }

        return $this->render('pages/contact.html.twig',[
            'form' => $form->createView(),
            'msg' => $message,
            'status' => $status
        ]);
    }

    /**
     * @Route("/about-us", name="about_us_index")
     */
    public function about(Request $request)
    {
        return $this->render('pages/about.html.twig');
    }

}
