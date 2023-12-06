<?php

namespace App\Controller;

use JsonException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\ConstraintViolationInterface;
use Symfony\Component\Validator\ConstraintViolationListInterface;

class ApiController extends AbstractController
{
    /**
     * @var integer HTTP status code - 200 (OK) by default
     */
    protected int $statusCode = 200;


    /**
     * Gets the value of statusCode.
     *
     * @return integer
     */
    protected function getStatusCode(): int
    {
        return $this->statusCode;
    }

    /**
     * Sets the value of statusCode.
     *
     * @param integer $statusCode the status code
     *
     * @return self
     */
    protected function setStatusCode(int $statusCode): static
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    /**
     * Returns a JSON response
     *
     * @param array $data
     * @param array $headers
     *
     * @return JsonResponse
     */
    public function respond(array $data = [], array $headers = []): JsonResponse
    {
        return new JsonResponse(
            [
                'data' => $data,
                'status_code' => $this->getStatusCode(),
                'message' => "success",
                "error" => null
            ],
            200,
            $headers
        );
    }

    /**
     * Returns a JSON response
     *
     * @param array $data
     * @param int $page
     * @param int $pageSize
     * @param array $headers
     *
     * @return JsonResponse
     */
    public function respondWithPagination(array $data = [], int $page = 1, int $pageSize = 30, array $headers = []): JsonResponse
    {
        return new JsonResponse([
            'pageCount' => ($data['count'] % $pageSize) > 0 ? (int)($data['count'] / $pageSize) + 1 : (int)($data['count'] / $pageSize),
            'count' => (int)$data['count'],
            'pageSize' => $pageSize,
            'page' => $page,
            'data' => $data['data'],
        ], $this->getStatusCode(), $headers);
    }

    /**
     * Sets an error message and returns a JSON response
     *
     * @param string $message
     * @param array $errors
     * @param array $headers
     *
     * @return JsonResponse
     */
    public function respondWithErrors(string $message, array $errors = [], array $headers = []): JsonResponse
    {
        $data = [
            'status_code' => $this->getStatusCode(),
            'message' => $message,
            'errors' => $errors
        ];

        return new JsonResponse($data, 200, $headers);
    }

    /**
     * Returns a 401 Unauthorized http response
     *
     * @param string $message
     * @param array $errors
     *
     * @return JsonResponse
     */
    public function respondUnauthorized(string $message = 'Not authorized!', array $errors = []): JsonResponse
    {
        return $this->setStatusCode(401)->respondWithErrors($message, $errors);
    }

    /**
     * Returns a 422 Unprocessable Entity
     *
     * @param string $message
     * @param array $errors
     *
     * @return JsonResponse
     */
    public function respondValidationError(string $message = 'Validation errors', array $errors = []): JsonResponse
    {
        return $this->setStatusCode(422)->respondWithErrors($message, $errors);
    }

    /**
     * Returns a 404 Not Found
     *
     * @param string $message
     * @param array $errors
     *
     * @return JsonResponse
     */
    public function respondNotFound(string $message = 'Not found!', array $errors = []): JsonResponse
    {
        return $this->setStatusCode(404)->respondWithErrors($message, $errors);
    }

    /**
     * Returns a 201 Created
     *
     * @param array $data
     *
     * @return JsonResponse
     */
    public function respondCreated(array $data = []): JsonResponse
    {
        return $this->setStatusCode(201)->respond($data);
    }

    // this method allows us to accept JSON payloads in POST requests
    // since Symfony 4 doesn’t handle that automatically:
    /**
     * @throws JsonException
     */
    protected function transformJsonBody(Request $request): ?Request
    {
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return null;
        }

        if ($data === null) {
            return $request;
        }

        $request->request->replace($data);

        return $request;
    }

    protected function getErrorsFromForm(FormInterface $form): array
    {
        $errors = array();

        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }

        foreach ($form->all() as $childForm) {
            if (($childForm instanceof FormInterface) && $childErrors = $this->getErrorsFromForm($childForm)) {
                $errors[$childForm->getName()] = $childErrors;
            }
        }

        return $errors;
    }

    protected function getErrorsFromValidationResult(ConstraintViolationListInterface $errors): array
    {
        $errs = [];
        /** @var ConstraintViolationInterface $error */
        foreach ($errors as $error) {
            $errs[] = [
                'message' => $error->getMessage(),
                'code' => $error->getCode(),
                'property_path' => $error->getPropertyPath(),
                'parameters' => $error->getParameters(),
            ];
        }
        return $errs;
    }
}
