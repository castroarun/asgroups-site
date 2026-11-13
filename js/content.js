/* =========================================================
   AS Groups — site content (the one place for facts and wording
   that appear on more than one page).

   To change a phone number, a project, a review or a counter,
   edit it here and every page picks it up.

   Anything in [square brackets] is a placeholder still to be
   confirmed — it shows on the site in gold so it is easy to spot.
   ========================================================= */

window.SITE = {
  name: 'AS Groups',
  tagline: 'Together we grow',

  contact: {
    whatsapp: '917305579137',          // digits only, with country code — enquiries open a chat here
    phones: ['+91 73055 79137', '+91 98400 26405'],
    email: 'asgroupsofbusinessconsultant26@gmail.com',
    place: 'Chennai, Tamil Nadu',
    replyTime: '[24 hours]'
  },

  social: {
    linkedin: 'https://www.linkedin.com/in/harish-ambigadoss-538801385/',
    instagram: 'https://www.instagram.com/vjharish._.8197/'
  },

  /* Count up from 0 when they scroll into view. */
  numbers: [
    { value: 4, suffix: '+', label: 'Businesses set up' },
    { value: 2, suffix: '', label: 'Projects in progress' },
    { value: 3, suffix: '', label: 'Areas of focus' },
    { value: 2020, from: 2000, suffix: '', label: 'On the ground in Chennai since' }
  ],

  /* The three verticals. `page` is the file each one links to.
     `live` / `progress` are the counters on the card; use null
     until the real number is known (shows as [00]). */
  verticals: [
    {
      id: 'setup',
      page: 'business-setup.html',
      name: 'Business Setup & Growth',
      short: 'Business setup',
      line: 'From first plan to opening day — and the scaling, franchising and partnerships after it.',
      image: 'assets/img/tintin.webp',
      imageAlt: 'Tintin burger outlet, set up by AS Groups',
      services: ['Business setup', 'Project planning', 'End-to-end execution', 'Startup solutions', 'Franchise development', 'Strategic partnerships'],
      hot: ['Business setup'],
      live: 4, progress: 1
    },
    {
      id: 'marketing',
      page: 'digital-marketing.html',
      name: 'Digital Marketing & Brand Growth',
      short: 'Marketing & branding',
      line: 'Digital marketing that brings customers to your door — with a clear monthly plan and a simple report, so you always see what’s working.',
      image: 'assets/img/flyer.webp',
      imageAlt: 'A marketing flyer',
      imageNote: '[Confirm: flyer designed by AS Groups?]',
      services: ['Digital marketing', 'Social media & content', 'Ads on Meta & Google', 'Google Business Profile & local SEO', 'WhatsApp marketing', 'Brand strategy', 'Physical marketing', 'Websites & apps'],
      hot: ['Digital marketing'],
      live: null, progress: null
    },
    {
      id: 'hospitality',
      page: 'hospitality-healthcare.html',
      name: 'Hospitality & Healthcare',
      short: 'Hospital or restaurant setup',
      line: 'Cafés, restaurants, tea shops and hospitals — set up, branded and run well.',
      image: 'assets/img/healthcamp.webp',
      imageAlt: 'Health camp with Thangam Hospitals',
      services: ['Hospital setup', 'Hospital branding', 'Tea shop & restaurant consulting', 'Operational management'],
      hot: [],
      live: null, progress: 1
    }
  ],

  /* Projects. `vertical` must match a vertical id above.
     status: 'live' or 'progress'. image: null shows a placeholder tile. */
  projects: [
    {
      name: 'Tintin · Smash, Eat & Repeat', vertical: 'setup', kind: 'Business setup', status: 'live',
      line: 'Burger outlet, set up end to end', place: '[Place]', when: '[Opened month]',
      image: 'assets/img/tintin.webp'
    },
    {
      name: '[Balaji’s business]', vertical: 'setup', kind: 'Business setup', status: 'live',
      line: 'Set up and handed over on time', place: '[Place]', when: '[Month]', image: null
    },
    {
      name: '[Interior décor studio]', vertical: 'setup', kind: 'Growth partner', status: 'progress',
      line: 'Existing business — AS Groups joining as growth partner', place: '', when: '[Expected month]', image: null
    },
    {
      name: '[Tea shop name]', vertical: 'hospitality', kind: 'Hospitality', status: 'progress',
      line: 'New hospitality outlet, setup underway', place: '[Place]', when: '[Expected opening]', image: null
    }
  ],

  /* Client video stories (left of the testimonials). Add more objects to add more stories.
     `video`: path to an .mp4 in assets/video (null shows the placeholder). `poster`: a still from it. `preview`: a short silent clip that loops in the card (keeps the page light).
     Vertical phone videos play in the card over a blurred copy, and open full height when played. */
  stories: [
    { quote: 'Together we grow.', who: 'Ashwin · Founder, GDA Academy', length: '1:04', video: 'assets/video/ashwin-gda-full.mp4', preview: 'assets/video/ashwin-gda-preview.mp4', poster: 'assets/video/ashwin-gda-full-poster.jpg' },
    { quote: '[Second client story — pull quote]', who: '[Client name] · [Business]', length: '[1:45]', video: null },
    { quote: '[Third client story — pull quote]', who: '[Client name] · [Business]', length: '[2:30]', video: null }
  ],

  /* Text reviews (right of the testimonials). Two show at a time and rotate. */
  reviews: [
    { source: 'via WhatsApp', date: '[Date]', text: 'The work was perfectly executed. I am very much satisfied by the way it was completed on time and perfection. Waiting to work with you for another project.', who: 'Balaji [surname]', biz: '[Business] · [permission pending]', initial: 'B', photo: null },
    { source: 'Google review', date: '[Date]', text: '[Client quote — two or three lines about what AS Groups did and how it went.]', who: '[Client name]', biz: '[Business], [Place]', initial: '[ ]', photo: null },
    { source: 'In person', date: '[Date]', text: '[Client quote.]', who: '[Client business]', biz: '[Place]', initial: 'LOGO', photo: null },
    { source: 'via WhatsApp', date: '[Date]', text: '[Client quote — what changed for the business after working with us.]', who: '[Client name]', biz: '[Business], [Place]', initial: '[ ]', photo: null }
  ],

  /* Reasons in the enquiry pop-up. */
  reasons: ['Business setup', 'Marketing & branding', 'Hospital or restaurant setup', 'Franchise or partnership', 'Jobs & careers (students)', 'General enquiry']
};
