import { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function SuccessConfirmation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [applicationId, setApplicationId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem('loanflow_application_id') || 'LF-000000-000000';
    setApplicationId(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number; gravity: number; color: string; life: number; }> = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: canvas.width / 2, y: canvas.height / 2 - 100, size: Math.random() * 8 + 4,
        speedX: Math.random() * 10 - 5, speedY: Math.random() * -10 - 5, gravity: 0.2,
        color: `hsl(${Math.random() * 40 + 190}, 70%, 50%)`, life: 100,
      });
    }
    let animId: number;
    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX; p.y += p.speedY; p.speedY += p.gravity; p.life--;
        ctx!.fillStyle = p.color; ctx!.fillRect(p.x, p.y, p.size, p.size);
        if (p.life <= 0) particles.splice(i, 1);
      }
      animId = requestAnimationFrame(animate);
    }
    const timeout = setTimeout(() => animate(), 300);
    return () => { clearTimeout(timeout); cancelAnimationFrame(animId); };
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(applicationId).catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [applicationId]);

  const handleNewApplication = () => {
    localStorage.removeItem('loanflow_application_id');
    window.location.href = '/';
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-gutter relative overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" style={{ width: '100%', height: '100%' }}></canvas>
        <section className="max-w-2xl w-full z-20">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg md:p-xl shadow-sm text-center">
            <div className="relative inline-flex mb-lg">
              <div className="absolute inset-0 bg-secondary opacity-10 rounded-full animate-ping"></div>
              <div className="w-24 h-24 md:w-32 md:h-32 bg-secondary flex items-center justify-center rounded-full text-on-secondary shadow-lg relative">
                <span className="material-symbols-outlined !text-[48px] md:!text-[64px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>
            <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-xs">Application Submitted Successfully</h1>
            <div className="inline-flex items-center px-md py-xs bg-surface-container-low rounded-full border border-secondary/20 mb-lg">
              <span className="font-label-md text-label-md text-on-surface-variant mr-xs">Reference:</span>
              <span className="font-label-md text-label-md text-secondary font-bold">{applicationId}</span>
              <button className="ml-sm text-secondary hover:text-secondary-container transition-all" onClick={handleCopy} title="Copy Reference">
                <span className="material-symbols-outlined !text-[18px]">{copied ? 'check' : 'content_copy'}</span>
              </button>
            </div>
            <div className="space-y-md mb-xl text-left border-t border-outline-variant pt-lg">
              <p className="font-body-lg text-body-lg text-on-surface-variant">Thank you for choosing LoanFlow. Your application has been received.</p>
              <div className="flex flex-col md:flex-row gap-sm justify-center">
                <button className="px-xl py-sm bg-primary text-on-primary font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-md flex items-center justify-center gap-xs" onClick={handleNewApplication}>
                  <span className="material-symbols-outlined">dashboard</span>Start New Application
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}