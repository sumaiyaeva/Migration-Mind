package com.sahil.backend.model;

import jakarta.persistence.*;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import org.hibernate.annotations.Type;
import java.time.LocalDateTime;
import java.util.UUID;
import com.fasterxml.jackson.databind.JsonNode;

@Entity
@Table(name = "schemas")
public class Schema {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "migration_id")
    private UUID migrationId;

    @Type(JsonType.class)
    @Column(name = "schema_json", columnDefinition = "jsonb", nullable = false)
    private JsonNode schemaJson;

    @Column
    private Boolean analyzed;

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    public Schema() {
    }

    public Schema(UUID migrationId, JsonNode schemaJson) {
        this.migrationId = migrationId;
        this.schemaJson = schemaJson;
        this.analyzed = false;
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

    public JsonNode getSchemaJson() {
        return schemaJson;
    }

    public void setSchemaJson(JsonNode schemaJson) {
        this.schemaJson = schemaJson;
    }

    public Boolean getAnalyzed() {
        return analyzed;
    }

    public void setAnalyzed(Boolean analyzed) {
        this.analyzed = analyzed;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
