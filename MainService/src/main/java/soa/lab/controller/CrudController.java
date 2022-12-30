package soa.lab.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import soa.lab.dto.OrganizationDTO;
import soa.lab.entity.Organization;
import soa.lab.service.OrganizationService;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/")
public class CrudController {
    private final OrganizationService organizationService;

    @Autowired
    public CrudController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping("/orgs")
    public ResponseEntity<List<Organization>> getOrgs(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size, @RequestParam(required = false) String filter, @RequestParam(required = false) String sort) {
        log.info("Request to get orgs with params: \npage: {}, \nsize: {}, \nfilter: {}, \nsort: {}", page, size, filter, sort);
        List<Organization> orgs = organizationService.getOrgs(page, size, filter, sort);
        log.info("GET request handled. Returning collection with {} elements", orgs.size());
        return new ResponseEntity<>(organizationService.getOrgs(page, size, filter, sort), HttpStatus.OK);
    }

    @PostMapping("/orgs")
    public ResponseEntity<Organization> addOrg(@RequestBody @Valid OrganizationDTO orgDTO) {
        log.info("Request to add org with body: {}", orgDTO);
        Organization org = new Organization(orgDTO);
        log.info("Request to add org handled");
        return new ResponseEntity<>(organizationService.addOrg(org), HttpStatus.OK);
    }

    @PutMapping("/orgs")
    public ResponseEntity<Organization> updateOrg(@RequestBody @Valid OrganizationDTO orgDTO) {
        log.info("Request to update org with body: {}", orgDTO);
        Organization orgUpd = new Organization(orgDTO);
        log.info("Request to update org handled");
        return new ResponseEntity<>(organizationService.updateOrg(orgDTO.getId(), orgUpd), HttpStatus.OK);
    }

    @GetMapping("/orgs/{id}")
    public ResponseEntity<Organization> getOrgById(@PathVariable @Valid Long id) {
        log.info("Request to get org with id: {}", id);
        return new ResponseEntity<>(organizationService.getOrgById(id), HttpStatus.OK);
    }

    @DeleteMapping("/orgs/{id}")
    public ResponseEntity<Organization> deleteOrgById(@PathVariable @Valid Long id) {
        log.info("Request to delete org with id: {}", id);
        return new ResponseEntity<>(organizationService.deleteOrgById(id), HttpStatus.OK);
    }
}