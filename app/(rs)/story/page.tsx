const page = () => {
  return (
    <article className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <header className="bg-accent px-8 py-12 text-center">
        <span className="text-indigo-200 font-semibold tracking-wider uppercase text-sm mb-2 block">
          A Developer's Tale
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          The Hydration Crisis at MetroTransit.io
        </h1>
        <p className="text-indigo-100 text-lg max-w-xl mx-auto">
          How one frontend developer saved the Friday commute by understanding
          React's rendering lifecycle.
        </p>
      </header>

      <div className="p-8 sm:p-12 space-y-12 text-lg leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm">
              1
            </span>
            The Peak Hour Panic
          </h2>
          <p className="mb-4">
            The dashboard of{" "}
            <span className="font-semibold italic text-slate-900">
              MetroTransit.io
            </span>{" "}
            was glowing an angry, unyielding red.
          </p>
          <p className="mb-4">
            It was 4:30 PM on a Friday. Thousands of commuters were frantically
            trying to book train tickets for the long weekend, and the website
            was collapsing under the weight of its own tech debt. Customer
            support tickets were flooding in with the same complaint:{" "}
            <span className="italic text-slate-600">
              "The page goes blank,"
            </span>{" "}
            or{" "}
            <span className="italic text-slate-600">
              "It takes ten seconds to load after I click a route."
            </span>
          </p>
          <p className="mb-4">
            Lead Frontend Developer, Alex, sat staring at the analytics monitor.
            The bounce rate was astronomical. The platform wasn't just slow; it
            was actively fighting its users.
          </p>
          <blockquote className="border-l-4 border-indigo-500 pl-4 py-1 my-6 italic text-slate-700 bg-slate-50 rounded-r-lg">
            "We have to patch this before the 5:00 PM rush," the project manager
            said, pacing behind Alex's chair. "Can we just add more servers?"
          </blockquote>
          <p>
            "It's not the servers," Alex replied, pulling up the Chrome
            DevTools. "It's the client. The frontend architecture is
            fundamentally broken."
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm">
              2
            </span>
            The Console of Horrors
          </h2>
          <p className="mb-4">
            Alex opened the browser console, and a wall of red text immediately
            populated the screen. It was a familiar, dreaded sight:
          </p>

          <div className="bg-slate-900 rounded-lg p-5 my-6 font-mono text-sm shadow-inner">
            <div className="text-red-400 mb-2">
              <span className="font-bold">Warning:</span> Text content did not
              match. Server: "16:30:22" Client: "16:30:23".
            </div>
            <div className="text-red-500">
              <span className="font-bold">Error:</span> Hydration failed because
              the initial UI does not match what was rendered on the server.
            </div>
          </div>

          <p className="mb-4">
            "Who wrote this?" Alex muttered, diving into the codebase.
          </p>
          <p className="mb-4">
            The previous agency had built the site using Next.js, but they
            hadn't understood how Server-Side Rendering actually worked. They
            had used{" "}
            <code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded text-sm">
              Date.now()
            </code>{" "}
            directly inside the ticket components. By the time the server sent
            the HTML to the user's browser, the time had changed, and React was
            throwing a massive hydration mismatch, refusing to patch the UI.
          </p>
          <p className="mb-4">
            Worse yet, Alex found the navigation logic. Instead of using the
            framework's router, every single route card had this attached to it:
          </p>
          <pre className="bg-slate-800 text-emerald-400 p-4 rounded-lg overflow-x-auto text-sm my-4">
            <code>onClick={"{() => (window.location.href = route.link)}"}</code>
          </pre>
          <p>
            "No wonder they are complaining about slow load times," Alex sighed.
            "Every time a user clicks a train route, it's forcing a hard reload
            of the entire application."
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm">
              3
            </span>
            The Refactor
          </h2>
          <p className="mb-6">
            With only twenty minutes until the absolute peak of the rush hour,
            Alex got to work. It was time for a surgical refactor.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="w-6 h-6 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">
                  Step 1: Taming the Timezones
                </h3>
                <p className="text-slate-600 mt-1 text-base">
                  Alex ripped out the raw{" "}
                  <code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded text-sm">
                    Date.now()
                  </code>{" "}
                  calls and implemented a custom hook to track the mounted
                  state. The server would render a generic skeleton, and only
                  after mounting would it grab the localized time. The errors
                  vanished.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="w-6 h-6 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">
                  Step 2: Stopping Hard Reloads
                </h3>
                <p className="text-slate-600 mt-1 text-base">
                  Alex stripped out the clunky{" "}
                  <code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded text-sm">
                    onClick
                  </code>{" "}
                  handlers. They imported the{" "}
                  <code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded text-sm">
                    &lt;Link&gt;
                  </code>{" "}
                  component from Next.js and wrapped the transit cards in proper
                  routing tags.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg
                  className="w-6 h-6 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">
                  Step 3: Fixing the DOM
                </h3>
                <p className="text-slate-600 mt-1 text-base">
                  Just to be safe, Alex cleaned up a few rogue{" "}
                  <code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded text-sm">
                    &lt;div&gt;
                  </code>{" "}
                  tags that someone had inexplicably nested inside of paragraph
                  tags.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 font-semibold text-slate-900">
            "Committing to main," Alex announced. "Deploying now."
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm">
              4
            </span>
            Smooth Sailing
          </h2>
          <p className="mb-4">
            The CI/CD pipeline spun into action. The build passed. The
            deployment went live.
          </p>
          <p className="mb-4">
            Alex and the project manager watched the analytics dashboard. The
            red lines slowly began to dip, replaced by steady, green traffic.
          </p>
          <p className="mb-4">
            Alex opened the live site and clicked on the "Express to Downtown"
            route. Instantly—without a single flash of a white screen, without a
            hard reload, and without a single console error—the page
            transitioned to the checkout screen. The Single Page Application was
            finally acting like one.
          </p>
          <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 my-6 italic text-slate-700 bg-emerald-50 rounded-r-lg">
            The project manager let out a long breath. "You fixed it. Bookings
            are going through."
          </blockquote>
          <p>
            Alex leaned back in the chair, closing the terminal. "The servers
            were fine. We just had to let React do its job."
          </p>
        </section>
      </div>

      <footer className="bg-slate-50 border-t border-slate-200 p-6 text-center text-sm text-slate-500">
        Built with clean HTML & Tailwind CSS.
      </footer>
    </article>
  );
};

export default page;
