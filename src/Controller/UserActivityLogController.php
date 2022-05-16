<?php

namespace App\Controller;

use App\Entity\UserActivityLog;
use App\Form\UserActivityLogType;
use App\Repository\UserActivityLogRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/user/activity/log")
 */
class UserActivityLogController extends AbstractController
{
    /**
     * @Route("/", name="user_activity_log_index", methods={"GET"})
     */
    public function index(UserActivityLogRepository $userActivityLogRepository): Response
    {
        return $this->render('user_activity_log/index.html.twig', [
            'user_activity_logs' => $userActivityLogRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="user_activity_log_new", methods={"GET", "POST"})
     */
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $userActivityLog = new UserActivityLog();
        $form = $this->createForm(UserActivityLogType::class, $userActivityLog);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($userActivityLog);
            $entityManager->flush();

            return $this->redirectToRoute('user_activity_log_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('user_activity_log/new.html.twig', [
            'user_activity_log' => $userActivityLog,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="user_activity_log_show", methods={"GET"})
     */
    public function show(UserActivityLog $userActivityLog): Response
    {
        return $this->render('user_activity_log/show.html.twig', [
            'user_activity_log' => $userActivityLog,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="user_activity_log_edit", methods={"GET", "POST"})
     */
    public function edit(Request $request, UserActivityLog $userActivityLog, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(UserActivityLogType::class, $userActivityLog);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('user_activity_log_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('user_activity_log/edit.html.twig', [
            'user_activity_log' => $userActivityLog,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="user_activity_log_delete", methods={"POST"})
     */
    public function delete(Request $request, UserActivityLog $userActivityLog, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$userActivityLog->getId(), $request->request->get('_token'))) {
            $entityManager->remove($userActivityLog);
            $entityManager->flush();
        }

        return $this->redirectToRoute('user_activity_log_index', [], Response::HTTP_SEE_OTHER);
    }
}
