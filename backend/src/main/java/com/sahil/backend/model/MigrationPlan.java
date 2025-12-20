package com.sahil.backend.model;

import jakarta.persistence.*;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import org.hibernate.annotations.Type;
import java.time.LocalDateTime;
import java.util.UUID;
import com.fasterxml.jackson.databind.JsonNode;

@Entity
@Table(name = "migration_plans")
public class MigrationPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "migration_id")
    private UUID migrationId;

    @Column(nullable = false)
    private String status; // DRAFT, APPROVED

    @Type(JsonType.class)
    @Column(name = "plan_json", columnDefinition = "jsonb", nullable = false)
    private JsonNode planJson;

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    public MigrationPlan() {
    }

    public MigrationPlan(UUID migrationId, String status, JsonNode planJson) {
        this.migrationId = migrationId;
        this.status = status;
        this.planJson = planJson;
        this.createdAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getMigrationId() {
        return migrationId;
    }

    public void setMigrationId(UUID migrationId) {
        this.migrationId = migrationId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public JsonNode getPlanJson() {
        return planJson;
    }

    public void setPlanJson(JsonNode planJson) {
        this.planJson = planJson;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
