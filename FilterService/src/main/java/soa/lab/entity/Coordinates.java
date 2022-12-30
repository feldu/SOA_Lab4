package soa.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class Coordinates {
    @JsonIgnore
    private long id;
    private float x;
    private Integer y;
}
