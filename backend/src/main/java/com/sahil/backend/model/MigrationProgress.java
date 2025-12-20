package com.sahil.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "migration_progress")
public class MigrationProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "run_id")
    private UUID runId;

    @Column(name = "table_name")
    private String tableName;

    @Column(name = "rows_total")
    private Long rowsTotal;

    @Column(name = "rows_processed")
    private Long rowsProcessed;

    @Column
    private String status;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    public MigrationProgress() {
    }

    public MigrationProgress(UUID runId, String tableName, Long rowsTotal, Long rowsProcessed, String status) {
        this.runId = runId;
        this.tableName = tableName;
        this.rowsTotal = rowsTotal;
        this.rowsProcessed = rowsProcessed;
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getRunId() {
        return runId;
    }

    public void setRunId(UUID runId) {
        this.runId = runId;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public Long getRowsTotal() {
        return rowsTotal;
    }

    public void setRowsTotal(Long rowsTotal) {
        this.rowsTotal = rowsTotal;
    }

    public Long getRowsProcessed() {
        return rowsProcessed;
    }

    public void setRowsProcessed(Long rowsProcessed) {
        this.rowsProcessed = rowsProcessed;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
