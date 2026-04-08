import Image from "next/image";

interface ResourceContentProps {
  resource: {
    title: string;
    content: string[];
  };
  translations: any;
}

export default function ResourceContent({ resource, translations }: ResourceContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <h3>Introduction</h3>
      <p className="lead">
        Welcome to this comprehensive resource on {resource.title.toLowerCase()}. This guide provides actionable insights and detailed information.
      </p>

      {/* Two-column content layout */}
      <div className="grid md:grid-cols-2 gap-8 my-8">
        {resource.content.map((point, i) => (
          <div key={i} className="pl-2">
            <h4 className="font-semibold mb-2 text-accent">Step {i + 1}</h4>
            <p>{point}</p>
          </div>
        ))}
      </div>

      {/* Article illustration image */}
      <div className="w-full h-64 relative rounded-2xl my-10 overflow-hidden border border-primary/10">
        <Image
          src="/holland-bg.jpg" // Replace with a real image
          alt="Article Illustration"
          fill
          className="object-cover"
        />
      </div>

      {/* Dummy additional info section */}
      <div className="bg-accent/10 p-6 rounded-2xl border border-accent/20 my-10 flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <h4 className="font-bold text-accent mb-2">Key Takeaways</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provides in-depth knowledge of the topic</li>
            <li>Practical tips and examples</li>
            <li>Applicable to real-world scenarios</li>
          </ul>
        </div>
        <div className="md:w-1/2">
          <h4 className="font-bold text-accent mb-2">Next Steps</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Apply the knowledge in your daily operations</li>
            <li>Consult with experts for advanced guidance</li>
            <li>Share insights with colleagues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}