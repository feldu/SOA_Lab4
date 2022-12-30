package soa.lab.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import soa.lab.entity.Organization;
import soa.lab.service.FilterService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/orgdirectory")
public class FilterController {
    private final FilterService filterService;

    @Autowired
    public FilterController(FilterService filterService) {
        this.filterService = filterService;
    }

    @CrossOrigin(origins = "https://localhost:31510")
    @GetMapping("/filter/turnover/{min-annual-turnover}/{max-annual-turnover}")
    public ResponseEntity<List<Organization>> filterOrgsByTurnover(@PathVariable("min-annual-turnover") Float min, @PathVariable("max-annual-turnover") Float max) {
        log.info("Request to get orgs between {} and {} turnover values", min, max);
        return new ResponseEntity<>(filterService.filterOrgsByTurnover(min, max), HttpStatus.OK);
    }

    @CrossOrigin(origins = "https://localhost:31510")
    @GetMapping("/filter/employees/{min-employees-count}/{max-employees-count}")
    public ResponseEntity<List<Organization>> filterOrgsByEmployeesCount(@PathVariable("min-employees-count") Float min, @PathVariable("max-employees-count") Float max) {
        log.info("Request to get orgs between {} and {} empoyees count values", min, max);
        return new ResponseEntity<>(filterService.filterOrgsByEmployeesCount(min, max), HttpStatus.OK);
    }
}
