import { Card, CardBody, CardHeader } from '@components/ui/Card';
import { Tabs } from '@components/ui/Tabs';
import {
  LiveRegion,
  SkipLink,
  VisuallyHidden,
  useFocusTrap,
  useLiveAnnouncer,
  useReducedMotion,
} from '@features/accessibility';

import { useState } from 'react';

const TABS = [
  { id: 'demo', label: 'Demo' },
  { id: 'info', label: 'Info' },
];

export const AccessibilityPage = () => {
  const [activeTab, setActiveTab] = useState('demo');
  const [trapActive, setTrapActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const announce = useLiveAnnouncer();
  const trapRef = useFocusTrap(trapActive);

  const handleAnnounce = () => {
    announce('This is a live announcement for screen readers', 'polite');
  };

  const handleAssertiveAnnounce = () => {
    announce('Important alert! This is an assertive announcement', 'assertive');
  };

  return (
    <div className="space-y-6">
      <SkipLink />
      <LiveRegion priority="polite" />
      <LiveRegion priority="assertive" />

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Accessibility
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Tools and utilities for building accessible applications
        </p>
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'demo' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Focus Trap Demo
              </h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <button
                  onClick={() => setTrapActive(!trapActive)}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  {trapActive ? 'Disable Focus Trap' : 'Enable Focus Trap'}
                </button>

                {trapActive && (
                  <div
                    ref={trapRef}
                    className="p-4 border-2 border-blue-500 rounded-lg space-y-3"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tab key is now trapped within this region
                    </p>
                    <input
                      type="text"
                      placeholder="Input 1"
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    />
                    <input
                      type="text"
                      placeholder="Input 2"
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    />
                    <button className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 dark:bg-gray-700">
                      Button 1
                    </button>
                    <button className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 dark:bg-gray-700">
                      Button 2
                    </button>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Live Announcer Demo
              </h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <button
                  onClick={handleAnnounce}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  Announce (Polite)
                </button>
                <button
                  onClick={handleAssertiveAnnounce}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Announce (Assertive)
                </button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Reduced Motion
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prefers reduced motion:{' '}
                <strong>{prefersReducedMotion ? 'Yes' : 'No'}</strong>
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Visually Hidden
              </h3>
            </CardHeader>
            <CardBody>
              <VisuallyHidden>
                This text is hidden visually but readable by screen readers
              </VisuallyHidden>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Text above is visually hidden but accessible to screen readers
              </p>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === 'info' && (
        <Card>
          <CardBody>
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Accessibility Features
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <strong>Skip Link:</strong> Keyboard users can skip to main
                  content
                </li>
                <li>
                  <strong>Focus Trap:</strong> Keeps focus within modal/dialog
                  regions
                </li>
                <li>
                  <strong>Live Regions:</strong> Announces dynamic content
                  changes to screen readers
                </li>
                <li>
                  <strong>Reduced Motion:</strong> Respects user's motion
                  preferences
                </li>
                <li>
                  <strong>Keyboard Navigation:</strong> Full keyboard support
                  with arrow keys
                </li>
                <li>
                  <strong>ARIA Labels:</strong> Proper semantic markup
                  throughout
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
