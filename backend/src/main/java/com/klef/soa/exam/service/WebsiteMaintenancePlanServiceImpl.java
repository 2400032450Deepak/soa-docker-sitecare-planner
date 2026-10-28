package com.klef.soa.exam.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.exam.entity.WebsiteMaintenancePlanEntity;
import com.klef.soa.exam.repository.WebsiteMaintenancePlanRepository;

@Service
public class WebsiteMaintenancePlanServiceImpl implements WebsiteMaintenancePlanService {

    @Autowired
    private WebsiteMaintenancePlanRepository repository;

    @Override
    public WebsiteMaintenancePlanEntity addPlan(WebsiteMaintenancePlanEntity plan) {
        return repository.save(plan);
    }

    @Override
    public List<WebsiteMaintenancePlanEntity> displayAll() {
        return repository.findAll();
    }

    @Override
    public Optional<WebsiteMaintenancePlanEntity> updatePlan(long id, WebsiteMaintenancePlanEntity plan) {
        return repository.findById(id).map(existing -> {
            existing.setWebsiteName(plan.getWebsiteName());
            existing.setPlanType(plan.getPlanType());
            existing.setMonthlyFee(plan.getMonthlyFee());
            existing.setActive(plan.getActive());
            return repository.save(existing);
        });
    }

    @Override
    public String deletePlan(long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Plan deleted successfully";
        } else {
            return "Plan not found with ID: " + id;
        }
    }
}