import type { PortalData } from '../types';

export type DemoScenario = 'normal' | 'slow' | 'error';

// Separate the transport from presentation. Failures are deterministic for demos/tests.
export async function loadPortal(
  signal: AbortSignal,
  scenario: DemoScenario,
): Promise<PortalData> {
  await new Promise<void>((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    };
    const timer = setTimeout(
      () => {
        signal.removeEventListener('abort', abort);
        resolve();
      },
      scenario === 'slow' ? 3500 : 450,
    );
    if (signal.aborted) abort();
    else signal.addEventListener('abort', abort, { once: true });
  });
  if (scenario === 'error')
    throw new Error('The workspace could not be reached.');
  const { mockData } = await import('../data/mock');
  return mockData;
}
