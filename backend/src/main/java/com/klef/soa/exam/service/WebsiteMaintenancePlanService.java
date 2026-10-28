package com.klef.soa.exam.service;

import java.util.List;
import java.util.Optional;

import com.klef.soa.exam.entity.WebsiteMaintenancePlanEntity;

public interface WebsiteMaintenancePlanService {

    public WebsiteMaintenancePlanEntity addPlan(WebsiteMaintenancePlanEntity plan);

    public List<WebsiteMaintenancePlanEntity> displayAll();

    public Optional<WebsiteMaintenancePlanEntity> updatePlan(long id, WebsiteMaintenancePlanEntity plan);

    public String deletePlan(long id);
}
