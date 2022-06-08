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
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportException;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Annotation\Route;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

/**
 * @Route("/program")
 */
class ProductController extends AbstractController
{


    /**
     * @Route("/", name="product_index")
     */
    public function indexAction(Request $request)
    {

        return $this->render('product/index.html.twig');

    }

    /**
     * @Route("/1", name="product_summer")
     */
    public function productSummer(Request $request, MailerInterface $mailer)
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
                    'Зуны хөтөлбөр /багц/' => 'Зуны хөтөлбөр /багц/',
                    'Веб хөгжүүлэлт' => 'Веб хөгжүүлэлт',
                    'Өгөгдлийн сангийн зохиомж' => 'Өгөгдлийн сангийн зохиомж',
                    'Backend хөгжүүлэлт' => 'Backend хөгжүүлэлт',
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
            $register->setComment($form['comment']->getData());
            $em->persist($register);
            $em->flush();

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
                return $this->redirectToRoute('product_summer',['status'=>'error']);
            }
            return $this->redirectToRoute('product_summer',['status'=>'success']);
        }

        if($status === 'success'){
            $message = 'Таны бүртгэл амжилттай хийгдлээ. И-мэйл хаягаа шалгана уу.';
        }elseif ($status === 'error'){
            $message = 'Бүртгэл хийгдэх явцад алдаа гарлаа. Та түр хүлээгээд дахин оролдоно уу.';
        }else{
            $message = '';
        }

        return $this->render('product/summer.html.twig', array(
            'form' => $form->createView(),
            'msg' => $message,
            'status' => $status
        ));


    }

    /**
     * @Route("/2", name="product_uiux")
     */
    public function productUiux(Request $request)
    {

        return $this->render('product/uiux.html.twig');

    }

//    /**
//     * @Route("/3   ", name="product_data")
//     */
//    public function productData(Request $request)
//    {
//
//        return $this->render('product/data.html.twig');
//
//    }

}
