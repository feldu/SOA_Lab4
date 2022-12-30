package soa.lab.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {DataNotFoundException.class})
    protected ResponseEntity<Object> handleDataNotFound(RuntimeException e, WebRequest request) {
        log.error("{}: {}", e.getClass().getSimpleName(), e.getMessage());
        ErrorDTO errorDTO = new ErrorDTO(e.getMessage());
        return handleExceptionInternal(e, errorDTO, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(value = {IllegalArgumentException.class})
    protected ResponseEntity<Object> handleDataIncorrect(RuntimeException e, WebRequest request) {
        log.error("{}: {}", e.getClass().getSimpleName(), e.getMessage());
        ErrorDTO errorDTO = new ErrorDTO(e.getMessage());
        return handleExceptionInternal(e, errorDTO, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = Exception.class)
    protected ResponseEntity<Object> handleServer(RuntimeException e, WebRequest request) {
        log.error("{}: {}", e.getClass().getSimpleName(), e.getMessage());
        ErrorDTO errorDTO = new ErrorDTO(e.getMessage());
        return handleExceptionInternal(e, errorDTO, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    @Data
    @AllArgsConstructor
    private static class ErrorDTO {
        private String message;
    }
}
