package com.sahil.backend.model;

import jakarta.persistence.*;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import org.hibernate.annotations.Type;
import java.time.LocalDateTime;
import java.util.UUID;
import com.fasterxml.jackson.databind.JsonNode;

@Entity
@Table(name = "schema_analysis")
public class SchemaAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "schema_id")
    private UUID schemaId;

    @Type(JsonType.class)
    @Column(name = "issues", columnDefinition = "jsonb")
    private JsonNode issues;

    @Type(JsonType.class)
    @Column(name = "suggestions", columnDefinition = "jsonb")
    private JsonNode suggestions;

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    public SchemaAnalysis() {
    }

    public SchemaAnalysis(UUID schemaId, JsonNode issues, JsonNode suggestions) {
        this.schemaId = schemaId;
        this.issues = issues;
        this.suggestions = suggestions;
        this.createdAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getSchemaId() {
        return schemaId;
    }

    public void setSchemaId(UUID schemaId) {
        this.schemaId = schemaId;
    }

    public JsonNode getIssues() {
        return issues;
    }

    public void setIssues(JsonNode issues) {
        this.issues = issues;
    }

    public JsonNode getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(JsonNode suggestions) {
        this.suggestions = suggestions;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
