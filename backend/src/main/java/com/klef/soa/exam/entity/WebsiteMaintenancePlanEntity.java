package com.klef.soa.exam.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "website_maintenance_plan")
public class WebsiteMaintenancePlanEntity {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @NotBlank(message = "Website name is required")
	    private String websiteName;

	    @NotBlank(message = "Plan type is required")
	    private String planType;

	    @NotNull(message = "Monthly fee is required")
	    @Positive(message = "Monthly fee must be greater than 0")
	    private Double monthlyFee;

	    @NotNull(message = "Active status is required")
	    private Boolean active;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getWebsiteName() {
			return websiteName;
		}

		public void setWebsiteName(String websiteName) {
			this.websiteName = websiteName;
		}

		public String getPlanType() {
			return planType;
		}

		public void setPlanType(String planType) {
			this.planType = planType;
		}

		public Double getMonthlyFee() {
			return monthlyFee;
		}

		public void setMonthlyFee(Double monthlyFee) {
			this.monthlyFee = monthlyFee;
		}

		public Boolean getActive() {
			return active;
		}

		public void setActive(Boolean active) {
			this.active = active;
		}

	    

}
