import { motion } from "framer-motion";

const techStack = [
  { name: "React", label: "React" },
  { name: "Spring Boot", label: "Spring Boot" },
  { name: "MCP", label: "MCP Protocol" },
  { name: "Supabase", label: "Supabase" },
  { name: "PostgreSQL", label: "PostgreSQL" },
];

export const LogoBar = () => {
  return (
    <section className="border-y border-border/30 bg-background/50 py-12">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center text-sm text-muted-foreground"
        >
          Built with modern, reliable technologies
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-16"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex items-center gap-2 rounded-lg border border-border/40 bg-secondary/30 px-4 py-2 text-muted-foreground/80 transition-colors hover:border-primary/30 hover:text-foreground"
            >
              <span className="text-sm font-medium tracking-wide">{tech.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default LogoBar;