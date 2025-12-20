package com.sahil.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "migration_runs")
public class MigrationRun {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "migration_id")
    private UUID migrationId;

    @Column(name = "plan_id")
    private UUID planId;

    @Column(nullable = false)
    private String status; // RUNNING, COMPLETED, FAILED

    @Column(name = "started_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime startedAt;

    @Column(name = "ended_at")
    private LocalDateTime endedAt;

    public MigrationRun() {
    }

    public MigrationRun(UUID migrationId, UUID planId, String status) {
        this.migrationId = migrationId;
        this.planId = planId;
        this.status = status;
        this.startedAt = LocalDateTime.now();
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

    public UUID getPlanId() {
        return planId;
    }

    public void setPlanId(UUID planId) {
        this.planId = planId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(LocalDateTime endedAt) {
        this.endedAt = endedAt;
    }
}
