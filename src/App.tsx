import { Container, GlassPanel, Button, Badge, SectionTitle, Input } from './components/ui';
import { Code, Terminal, GitBranch, Mail } from 'lucide-react';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Container maxWidth="lg">
        <section className="preview">
          <SectionTitle
            label="01"
            title="Component Library"
            description="UI components built with React and CSS Modules."
          />

          <div className="grid">
            {/* Buttons */}
            <GlassPanel variant="card" hover className="card">
              <h3 className="cardTitle">Buttons</h3>
              <div className="row">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div className="row">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="row">
                <Button isLoading>Loading</Button>
                <Button leftIcon={<Code size={16} />}>With Icon</Button>
              </div>
            </GlassPanel>

            {/* Badges */}
            <GlassPanel variant="card" hover className="card">
              <h3 className="cardTitle">Badges</h3>
              <div className="row">
                <Badge>Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <div className="row">
                <Badge icon={Code} size="xs">React</Badge>
                <Badge icon={Terminal} size="sm">TypeScript</Badge>
                <Badge icon={GitBranch} size="md">GitHub</Badge>
              </div>
            </GlassPanel>

            {/* Inputs */}
            <GlassPanel variant="card" hover className="card">
              <h3 className="cardTitle">Inputs</h3>
              <div className="column">
                <Input label="Email" placeholder="you@example.com" />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  error="Password must be at least 8 characters"
                />
                <Input
                  label="Search"
                  placeholder="Search..."
                  leftIcon={<Mail size={16} />}
                />
              </div>
            </GlassPanel>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default App;
