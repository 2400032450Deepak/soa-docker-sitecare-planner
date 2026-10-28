package com.klef.soa.exam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.soa.exam.entity.WebsiteMaintenancePlanEntity;
import com.klef.soa.exam.service.WebsiteMaintenancePlanService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/WebsiteMaintenancePlan")
public class WebsiteMaintenancePlanController {

    @Autowired
    private WebsiteMaintenancePlanService service;

    @GetMapping("/")
    public String home() {
        return "CRUD Service is running";
    }

    @PostMapping("/Add")
    public WebsiteMaintenancePlanEntity addPlan(
            @Valid @RequestBody WebsiteMaintenancePlanEntity plan) {
        return service.addPlan(plan);
    }

    @GetMapping("/DisplayAll")
    public List<WebsiteMaintenancePlanEntity> displayAll() {
        return service.displayAll();
    }

    @PutMapping("/Update/{id}")
    public ResponseEntity<?> updatePlan(
            @PathVariable long id,
            @Valid @RequestBody WebsiteMaintenancePlanEntity plan) {
        return service.updatePlan(id, plan)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404)
                        .body("Plan not found with ID: " + id));
    }

    @DeleteMapping("/Delete/{id}")
    public String deletePlan(@PathVariable long id) {
        return service.deletePlan(id);
    }
}
