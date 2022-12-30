package soa.lab.dto;

import lombok.Data;

@Data
public class AddressDTO {
    private String zipCode;
    private LocationDTO town;
}
