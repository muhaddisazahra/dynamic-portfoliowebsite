
"use client";

import Image from "next/image";
import { useEffect, useState, FormEvent } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
};

const PROFILE = {
  name: "Muhaddisa Zahra",
  shortName: "MZ",
  image: "/picture.jpg",
  role: "Pharm-D Graduate",
  subtitle: "Exploring Agentic AI & Web Development",
  location: "Pakistan",
  linkedin: "https://www.linkedin.com/in/muhaddisa-zahra-046934385/",
  github: "https://github.com/muhaddisazahra",
};

const skills = [
  {
    number: "01",
    icon: "⚕",
    title: "Pharmaceutical Sciences",
    description:
      "Pharmaceutical knowledge, medication awareness, healthcare fundamentals and scientific understanding.",
    tags: ["Pharm-D", "Healthcare", "Pharmaceutical Sciences"],
  },
  {
    number: "02",
    icon: "✳",
    title: "Agentic AI",
    description:
      "Exploring intelligent agents, AI-powered workflows and practical automation solutions.",
    tags: ["AI Agents", "Automation", "AI Workflows"],
  },
  {
    number: "03",
    icon: "⌘",
    title: "Web Development",
    description:
      "Building interactive and responsive web experiences using modern development technologies.",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    number: "04",
    icon: "◈",
    title: "Creative Problem Solving",
    description:
      "Combining analytical thinking, continuous learning and technology to explore meaningful solutions.",
    tags: ["Research", "Problem Solving", "Innovation"],
  },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "JavaScript",
  "Git",
  "GitHub",
  "Agentic AI",
  "Workflow Automation",
  "NeonDB",
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [managerOpen, setManagerOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch projects from NeonDB
  async function fetchProjects() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/projects", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to load projects.");
      }

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError("Projects could not be loaded. Please check your database connection.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // Add or update project
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setMessage("Please complete both fields.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const url = editingId
        ? `/api/projects/${editingId}`
        : "/api/projects";

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setTitle("");
      setDescription("");
      setEditingId(null);
      setMessage(
        editingId
          ? "Project updated successfully!"
          : "Project added successfully!"
      );

      await fetchProjects();
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Unable to save project."
      );
    } finally {
      setSaving(false);
    }
  }

  // Edit project
  function handleEdit(project: Project) {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setMessage("");

    document.getElementById("project-manager")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  // Delete project
  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete project.");
      }

      setMessage("Project deleted successfully!");
      await fetchProjects();
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Unable to delete project."
      );
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setMessage("");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF8F3] text-[#292326]">

      {/* NAVIGATION */}

      <header className="sticky top-0 z-50 border-b border-[#E9E1DC] bg-[#FAF8F3]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">

          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#65384F] text-sm font-bold text-white">
              MZ
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">
                Muhaddisa Zahra
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#947B87]">
                Personal Portfolio
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-8 text-xs font-semibold text-[#756B6D] md:flex">
            <a href="#about" className="nav-link">About</a>
            <a href="#education" className="nav-link">Education</a>
            <a href="#skills" className="nav-link">Expertise</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <a
            href="#contact"
            className="rounded-full bg-[#65384F] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#854D69] hover:shadow-lg"
          >
            Let's Connect ↗
          </a>

        </nav>
      </header>


      {/* HERO SECTION */}

      <section
        id="home"
        className="hero-pattern relative flex min-h-[730px] items-center overflow-hidden px-6 py-24 lg:px-12"
      >

        <div className="orb orb-one" />
        <div className="orb orb-two" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Hero Text */}

          <div className="animate-fade-up">

            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#E7D8DE] bg-white/70 px-4 py-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#77916F]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#76546A]">
                Exploring ideas. Building possibilities.
              </span>
            </div>

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#98788A]">
              Hello, I'm
            </p>

            <h1 className="max-w-3xl text-6xl font-black leading-[1.04] tracking-[-0.065em] sm:text-7xl lg:text-[88px]">
              Muhaddisa
              <span className="serif-accent block">
                Zahra.
              </span>
            </h1>

            <div className="my-8 h-[2px] w-20 bg-[#B995A5]" />

            <h2 className="max-w-xl text-xl font-semibold leading-relaxed text-[#51454A] sm:text-2xl">
              Pharm-D Graduate
              <span className="text-[#A17A8D]"> & </span>
              <br />
              <span className="font-serif italic text-[#854D69]">
                Emerging Agentic AI Builder
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-8 text-[#786E70]">
              Bringing healthcare knowledge and technological curiosity
              together to explore intelligent solutions, creative ideas
              and meaningful digital experiences.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="#projects"
                className="rounded-full bg-[#65384F] px-8 py-4 text-xs font-bold text-white shadow-xl shadow-[#65384F]/15 transition hover:-translate-y-1 hover:bg-[#854D69]"
              >
                Explore My Work ↗
              </a>

              <a
                href="#about"
                className="rounded-full border border-[#D9C8CE] bg-white/60 px-8 py-4 text-xs font-bold text-[#65384F] transition hover:-translate-y-1 hover:bg-white"
              >
                Discover My Story
              </a>

            </div>

            <div className="mt-12 flex items-center gap-6">

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#756B6D] transition hover:text-[#65384F]"
              >
                GITHUB ↗
              </a>

              <span className="h-4 w-px bg-[#D9C8CE]" />

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#756B6D] transition hover:text-[#65384F]"
              >
                LINKEDIN ↗
              </a>

            </div>
          </div>


          {/* Profile Photograph */}

          <div className="animate-fade-up relative mx-auto w-full max-w-[390px]">

            <div className="absolute -inset-5 rounded-[48%_48%_38%_38%] border border-[#CDB8C2] opacity-70" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[48%_48%_38%_38%] border-[10px] border-white bg-[#EADDE1] shadow-2xl shadow-[#65384F]/15">

              <Image
                src={PROFILE.image}
                alt="Muhaddisa Zahra - Personal Portrait"
                fill
                priority
                sizes="(max-width: 768px) 80vw, 390px"
                className="object-cover object-center"
              />

            </div>

            <div className="absolute -right-8 top-16 rounded-2xl border border-[#E8D9D7] bg-white p-4 shadow-xl">
              <span className="text-2xl">✦</span>
              <p className="mt-1 text-xs font-bold text-[#65384F]">
                Always Learning
              </p>
            </div>

            <div className="absolute -bottom-5 -left-8 rounded-2xl border border-[#D8E0D2] bg-white p-4 shadow-xl">
              <span className="text-2xl">⚕</span>
              <p className="mt-1 text-xs font-bold text-[#637A60]">
                Pharm-D
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* MOVING TECHNOLOGY STRIP */}

      <section className="overflow-hidden border-y border-[#E8E0DB] bg-white py-6">

        <div className="marquee-track flex w-max items-center gap-12">

          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={`${tech}-${index}`}
              className="flex items-center gap-12"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#897780]">
                {tech}
              </span>
              <span className="text-[#B995A5]">✳</span>
            </div>
          ))}

        </div>

      </section>


      {/* ABOUT SECTION */}

      <section id="about" className="section-padding px-6 lg:px-12">

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">

          <div>

            <p className="section-label">01 — A LITTLE ABOUT ME</p>

            <h2 className="section-heading">
              Different fields.
              <span className="serif-accent block">
                One curious mind.
              </span>
            </h2>

            <p className="mt-8 text-sm leading-8 text-[#756B6D]">
              I am Muhaddisa Zahra, a Pharm-D graduate from Pakistan
              with an interest in exploring how technology can create
              meaningful solutions.
            </p>

            <p className="mt-5 text-sm leading-8 text-[#756B6D]">
              My pharmaceutical education has given me a foundation
              in healthcare and scientific thinking. Alongside this,
              I am learning Agentic AI, web development and workflow
              automation to build practical digital experiences.
            </p>

            <p className="mt-5 text-sm leading-8 text-[#756B6D]">
              I enjoy learning new technologies, experimenting with
              ideas and turning concepts into working projects.
            </p>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-3 border-b border-[#854D69] pb-2 text-xs font-bold text-[#65384F] transition hover:gap-5"
            >
              CONNECT WITH ME <span>↗</span>
            </a>

          </div>


          <div className="relative">

            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#E9DCE1] blur-2xl" />

            <div className="relative rounded-[32px] border border-[#E8DFDA] bg-white p-9 shadow-xl shadow-[#65384F]/5 sm:p-12">

              <p className="section-label">MY PERSONAL JOURNEY</p>

              <div className="mt-10 space-y-9">

                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F1E5E9] text-xl">
                    ⚕
                  </div>
                  <div>
                    <h3 className="font-bold">Healthcare Foundation</h3>
                    <p className="mt-2 text-xs leading-6 text-[#817579]">
                      A pharmaceutical education built around
                      healthcare and scientific knowledge.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8EEE3] text-xl">
                    ✳
                  </div>
                  <div>
                    <h3 className="font-bold">Exploring Artificial Intelligence</h3>
                    <p className="mt-2 text-xs leading-6 text-[#817579]">
                      Learning agentic systems, AI concepts
                      and intelligent workflows.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9E5F0] text-xl">
                    ⌘
                  </div>
                  <div>
                    <h3 className="font-bold">Building Digital Experiences</h3>
                    <p className="mt-2 text-xs leading-6 text-[#817579]">
                      Developing practical web applications
                      and experimenting with new ideas.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* EDUCATION SECTION */}

      <section id="education" className="section-padding bg-[#F0EBE6] px-6 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <p className="section-label">02 — EDUCATION</p>

          <h2 className="section-heading">
            My academic
            <span className="serif-accent"> foundation.</span>
          </h2>

          <div className="journey-card mt-14 flex flex-col gap-8 md:flex-row md:items-center">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#F1E5E9] text-4xl">
              ⚕
            </div>

            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#98788A]">
                PROFESSIONAL EDUCATION
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-tight">
                Doctor of Pharmacy
              </h3>

              <p className="mt-2 font-serif text-lg italic text-[#854D69]">
                Pharm-D Graduate
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#786E70]">
                Completed professional education in pharmaceutical
                sciences, developing a foundation in medication,
                healthcare and pharmaceutical knowledge.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F5EF] px-6 py-4 text-center">
              <p className="text-xs font-bold text-[#65384F]">
                Pakistan
              </p>
              <p className="mt-1 text-[10px] text-[#897780]">
                Location
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* SKILLS SECTION */}

      <section id="skills" className="section-padding px-6 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <p className="section-label">03 — SKILLS & INTERESTS</p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <h2 className="section-heading">
              What I bring
              <span className="serif-accent"> to the table.</span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-[#817579]">
              A combination of pharmaceutical knowledge,
              technology exploration and creative thinking.
            </p>

          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {skills.map((skill) => (

              <div key={skill.number} className="skill-card">

                <div className="flex items-center justify-between">

                  <span className="text-3xl text-[#854D69]">
                    {skill.icon}
                  </span>

                  <span className="text-xs font-bold text-[#B69DA8]">
                    {skill.number}
                  </span>

                </div>

                <h3 className="mt-9 text-xl font-bold tracking-tight">
                  {skill.title}
                </h3>

                <p className="mt-4 text-xs leading-7 text-[#817579]">
                  {skill.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">

                  {skill.tags.map((tag) => (

                    <span
                      key={tag}
                      className="rounded-full bg-[#F0E8E8] px-3 py-2 text-[9px] font-semibold text-[#76546A]"
                    >
                      {tag}
                    </span>

                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* PROJECTS SECTION */}

      <section id="projects" className="section-padding bg-[#F0EBE6] px-6 lg:px-12">

        <div className="mx-auto max-w-7xl">

          <p className="section-label">04 — SELECTED WORK</p>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <h2 className="section-heading">
                Ideas turned into
                <span className="serif-accent"> projects.</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#817579]">
                A collection of my practical experiments, digital
                projects and learning journey.
              </p>
            </div>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 text-xs font-bold text-[#65384F] transition hover:translate-x-1"
            >
              VIEW GITHUB ↗
            </a>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {loading ? (

              <div className="col-span-full py-16 text-center text-sm text-[#897780]">
                Loading projects...
              </div>

            ) : error ? (

              <div className="col-span-full rounded-3xl border border-[#E5D9D4] bg-white p-10 text-center">
                <p className="text-sm text-[#854D69]">{error}</p>
                <button
                  onClick={fetchProjects}
                  className="mt-5 rounded-full bg-[#65384F] px-6 py-3 text-xs font-bold text-white"
                >
                  Try Again
                </button>
              </div>

            ) : projects.length === 0 ? (

              <div className="col-span-full rounded-3xl border border-dashed border-[#CDB8C2] bg-white/70 px-6 py-16 text-center">

                <span className="text-4xl">✳</span>

                <h3 className="mt-5 text-xl font-bold">
                  Something exciting is coming.
                </h3>

                <p className="mt-3 text-sm text-[#897780]">
                  My projects will appear here as I add them.
                </p>

                <button
                  onClick={() => {
                    setManagerOpen(true);
                    document.getElementById("project-manager")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="mt-7 rounded-full bg-[#65384F] px-7 py-3 text-xs font-bold text-white transition hover:bg-[#854D69]"
                >
                  Add Your First Project
                </button>

              </div>

            ) : (

              projects.map((project, index) => (

                <article key={project.id} className="project-card group">

                  <div className="flex items-center justify-between">

                    <span className="text-3xl text-[#B995A5]">
                      {["✳", "◈", "⌘"][index % 3]}
                    </span>

                    <span className="text-xs font-bold text-[#B69DA8]">
                      PROJECT / {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>

                  <h3 className="mt-9 text-2xl font-bold tracking-tight">
                    {project.title}
                  </h3>

                  <p className="mt-4 flex-1 text-sm leading-7 text-[#817579]">
                    {project.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between border-t border-[#EEE6E2] pt-5">

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#98788A]">
                      PERSONAL PROJECT
                    </span>

                    <span className="text-xl text-[#65384F] transition group-hover:translate-x-2">
                      ↗
                    </span>

                  </div>

                </article>

              ))

            )}

          </div>

        </div>

      </section>


      {/* PROJECT MANAGEMENT */}

      <section id="project-manager" className="section-padding px-6 lg:px-12">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-[32px] border border-[#E7DCD7] bg-white p-7 shadow-xl shadow-[#65384F]/5 sm:p-12">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

              <div>
                <p className="section-label">
                  PROJECT CONTROL CENTER
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight">
                  Manage your projects.
                </h2>

                <p className="mt-3 text-sm text-[#817579]">
                  Add, update and organize your portfolio projects.
                </p>
              </div>

              <button
                onClick={() => {
                  setManagerOpen(!managerOpen);
                  cancelEdit();
                }}
                className="rounded-full bg-[#65384F] px-6 py-4 text-xs font-bold text-white transition hover:bg-[#854D69]"
              >
                {managerOpen ? "Close Manager −" : "Open Manager +"}
              </button>

            </div>


            {managerOpen && (

              <div className="mt-10 border-t border-[#EEE6E2] pt-9">

                <form onSubmit={handleSubmit} className="space-y-6">

                  <div>

                    <label className="text-xs font-bold text-[#65384F]">
                      PROJECT TITLE
                    </label>

                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter project name"
                      maxLength={255}
                      required
                      className="form-input"
                    />

                  </div>


                  <div>

                    <label className="text-xs font-bold text-[#65384F]">
                      PROJECT DESCRIPTION
                    </label>

                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your project..."
                      rows={5}
                      maxLength={5000}
                      required
                      className="form-input resize-none"
                    />

                  </div>


                  <div className="flex flex-wrap gap-3">

                    <button
                      type="submit"
                      disabled={saving}
                      className="rounded-full bg-[#65384F] px-8 py-4 text-xs font-bold text-white transition hover:bg-[#854D69] disabled:opacity-50"
                    >
                      {saving
                        ? "Saving..."
                        : editingId
                          ? "Save Changes"
                          : "Add Project +"}
                    </button>

                    {editingId && (

                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="rounded-full border border-[#D9C8CE] px-8 py-4 text-xs font-bold text-[#65384F]"
                      >
                        Cancel
                      </button>

                    )}

                  </div>

                  {message && (
                    <p role="status" className="text-sm font-medium text-[#65384F]">
                      {message}
                    </p>
                  )}

                </form>


                <div className="mt-12">

                  <div className="mb-6 flex items-center justify-between">

                    <h3 className="font-bold">
                      Existing Projects
                    </h3>

                    <span className="rounded-full bg-[#F0E8E8] px-4 py-2 text-xs font-bold text-[#65384F]">
                      {projects.length} Projects
                    </span>

                  </div>


                  <div className="space-y-4">

                    {projects.map((project) => (

                      <div
                        key={project.id}
                        className="flex flex-col justify-between gap-5 rounded-2xl border border-[#E8E0DB] bg-[#FAF8F3] p-5 sm:flex-row sm:items-center"
                      >

                        <div className="min-w-0 flex-1">

                          <h4 className="font-bold">
                            {project.title}
                          </h4>

                          <p className="mt-2 line-clamp-2 text-xs leading-6 text-[#817579]">
                            {project.description}
                          </p>

                        </div>


                        <div className="flex shrink-0 gap-2">

                          <button
                            onClick={() => handleEdit(project)}
                            className="rounded-full border border-[#D9C8CE] px-5 py-3 text-xs font-bold text-[#65384F] transition hover:bg-[#F0E8E8]"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(project.id)}
                            className="rounded-full border border-[#E8D1D1] px-5 py-3 text-xs font-bold text-[#A34F55] transition hover:bg-[#F9E8E8]"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    ))}

                    {projects.length === 0 && (
                      <p className="rounded-2xl bg-[#FAF8F3] p-6 text-center text-sm text-[#897780]">
                        No projects have been added yet.
                      </p>
                    )}

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* CONTACT SECTION */}

      <section id="contact" className="section-padding relative overflow-hidden bg-[#65384F] px-6 text-white lg:px-12">

        <div className="orb orb-one opacity-30" />

        <div className="relative z-10 mx-auto max-w-7xl">

          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DCC5D0]">
            05 — LET'S CONNECT
          </p>

          <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:items-end">

            <div>

              <h2 className="max-w-2xl text-5xl font-black leading-tight tracking-[-0.06em] sm:text-7xl">
                Every great idea starts with a
                <span className="serif-accent text-[#DDBDCE]">
                  {" "}conversation.
                </span>
              </h2>

              <p className="mt-8 max-w-lg text-sm leading-8 text-[#E3D3DB]">
                Interested in technology, healthcare innovation,
                AI-powered solutions or simply exchanging ideas?
                I'd love to connect.
              </p>

            </div>


            <div className="space-y-5">

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/20 bg-white/5 p-6 transition hover:bg-white/10"
              >

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#DDBDCE]">
                    PROFESSIONAL NETWORK
                  </p>
                  <p className="mt-2 font-bold">Connect on LinkedIn</p>
                </div>

                <span className="text-2xl transition group-hover:translate-x-2">
                  ↗
                </span>

              </a>


              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/20 bg-white/5 p-6 transition hover:bg-white/10"
              >

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#DDBDCE]">
                    MY DEVELOPMENT WORK
                  </p>
                  <p className="mt-2 font-bold">Explore GitHub</p>
                </div>

                <span className="text-2xl transition group-hover:translate-x-2">
                  ↗
                </span>

              </a>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="bg-[#4D2B3D] px-6 py-8 text-white lg:px-12">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <p className="font-bold tracking-tight">
              Muhaddisa Zahra.
            </p>

            <p className="mt-2 text-[10px] text-[#D4BBC8]">
              Pharm-D Graduate · Exploring AI & Technology
            </p>
          </div>

          <p className="text-xs text-[#D4BBC8]">
            © {new Date().getFullYear()} Muhaddisa Zahra. All rights reserved.
          </p>

          <a
            href="#home"
            className="text-xs font-bold text-white transition hover:text-[#DDBDCE]"
          >
            BACK TO TOP ↑
          </a>

        </div>

      </footer>

    </main>
  );
}
