package soa.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class Address {
    @JsonIgnore
    private long id;
    private String zipCode;
    private Location town;
}
