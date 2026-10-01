import { seoBlogPosts } from "./seo-blog";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "delivery-price-calculator-website",
    title: "How to Add a Delivery Price Calculator to Your Website",
    description: "A step-by-step guide for courier and delivery companies that want customers to get a delivery price on the website instead of calling for one.",
    date: "2026-03-15",
    readTime: "6 min read",
    category: "How-To",
    content: `
<p>If you run a delivery or courier business, you know how this goes. Someone lands on your website, can't find a price, and calls or emails to ask. You put down what you're doing, get the pickup and drop-off, work out the miles, and send a number back. A good share of those people never reply.</p>

<p>A delivery price calculator on your site takes that whole exchange off your plate. The customer types in the job and sees an estimate, and you get their details without picking up the phone.</p>

<h2>What is a delivery price calculator?</h2>

<p>It's a small form embedded on your website. The customer enters pickup and drop-off addresses, what they're sending, and the service they want (same-day, scheduled, and so on). The calculator works out the distance and applies your pricing rules, such as your rate per mile, minimum charge, and surcharges, to produce an estimate in a few seconds.</p>

<p>The useful ones also ask for the customer's name, email, and phone number before showing the price, so every quote lands in your dashboard as a lead you can call back.</p>

<h2>Why manual quoting is hurting your business</h2>

<ul>
<li><strong>People don't wait.</strong> An office manager who needs a box of files across town by 3pm will try the next courier in the search results if yours doesn't show a price. If that competitor has a quote form, they get the job.</li>
<li><strong>The minutes add up.</strong> Say a quote takes 3 minutes. At 20 requests a day, that's an hour spent on arithmetic that software handles instantly.</li>
<li><strong>You can't answer the phone mid-delivery.</strong> A calculator on your site keeps taking requests at 10pm, on Sundays, and while you're halfway through a 40-mile run.</li>
</ul>

<h2>What to look for in a delivery price calculator</h2>

<p>Quote tools vary a lot. These are the features that separate a useful one from a toy:</p>

<ul>
<li><strong>Your pricing rules, not generic estimates.</strong> The tool should use your actual rate per mile, your minimum charge, and the extras you charge for (stairs, inside delivery, after-hours). A generic shipping calculator won't reflect local courier pricing.</li>
<li><strong>Lead capture built in.</strong> The calculator should collect name, email, and phone before or after showing the quote, and store those leads somewhere you'll actually look.</li>
<li><strong>White-label appearance.</strong> It should look like part of your site, not a third-party widget. That means your logo, your colors, your button text.</li>
<li><strong>Easy installation.</strong> You should be able to paste one embed code into your website and be done. No developer required.</li>
</ul>

<h2>How to install one on your website</h2>

<p>With Qalt, setup takes about 10 minutes:</p>

<ol>
<li><strong>Sign up and enter your pricing.</strong> Set your base rate per mile, minimum charge, and any service extras. Qalt does the math from there.</li>
<li><strong>Customize the appearance.</strong> Upload your logo, set your brand color, and change the header and button text so the form matches your site.</li>
<li><strong>Copy your embed code.</strong> You'll get a single iframe snippet tied to your account.</li>
<li><strong>Paste it into your website.</strong> Drop it into a Custom HTML block in WordPress, an Embed element in Webflow, or an HTML block in Shopify.</li>
</ol>

<p>Once it's live, every quote request shows up in your Qalt dashboard with the customer's contact info, the route, and the estimated price. If someone needs a second drop along the way, they can add an extra stop in the form instead of calling to ask what it costs.</p>

<h2>What changes once it's live</h2>

<p>The first thing most owners notice is fewer calls that amount to "how much from here to there?" The second is requests from people who never would have called, like the shop owner comparing couriers at 9pm who wants a number before tomorrow.</p>

<p>If your site has no way to get a price and the couriers ranking next to you do, adding one is probably the most useful change you can make to it this week.</p>

<p>Ready to try it? <a href="/register">Create your free Qalt account</a>. The free Starter plan gives you one quote form and 50 quotes a month with no card. Upgrade when you need Pro features.</p>
    `.trim(),
  },
  {
    slug: "last-mile-delivery-software-small-couriers",
    title: "Last Mile Delivery Software for Small Couriers: What You Actually Need",
    description: "Most last mile delivery software is built for enterprise fleets. What a small courier company actually needs from software, and what it can skip for now.",
    date: "2026-03-18",
    readTime: "7 min read",
    category: "Industry",
    content: `
<p>Search for "last mile delivery software" and you'll mostly find enterprise platforms with route optimization engines, fleet dashboards, and annual contracts priced for companies with hundreds of vans. If you run a small courier business with a handful of drivers and a list of regular local clients, most of that is more than you need and more than you want to pay for.</p>

<p>That doesn't mean running everything on spreadsheets and a group text forever. A few tools genuinely help a smaller operation, and this post goes through which ones.</p>

<h2>What "last mile" actually means</h2>

<p>Last mile delivery is the final leg of a shipment's trip, from a hub or pickup point to the person or business receiving it. For a small courier, that's basically the whole business: you pick something up and you drop it off. The reason logistics people talk about the "last mile problem" is that this leg costs the most per package, because every stop is different and a city doesn't route neatly.</p>

<h2>What small couriers actually need from software</h2>

<p>Skip the enterprise feature checklist. For a small operation, four things do most of the work.</p>

<h3>1. Online quote capture</h3>
<p>Before you can route or dispatch anything, you need the job. If customers have to call to get a price, some of them will book with whoever lets them see one online. A delivery quote widget on your website collects everything you need to price the job (pickup and drop-off, package details, service type) so you can accept work without a phone call.</p>

<h3>2. Job management</h3>
<p>You need one place to see incoming requests, mark them accepted or completed, and leave yourself notes like "gate code 4471" or "call on arrival." It doesn't have to be fancy. A clean list with status filters is plenty for an operation running under 50 jobs a day.</p>

<h3>3. Customer communication</h3>
<p>An automatic email when a quote is submitted or a job is accepted saves a lot of "did you get my request?" calls. Customers mostly want to know someone saw it. Email notifications handle that without you typing the same message twenty times.</p>

<h3>4. Basic reporting</h3>
<p>You should be able to answer a few questions quickly: how many jobs came in this month, what the average job is worth, and which zip codes send you the most work. That's enough to tell you whether your minimum is too low or whether it's time to put a second driver on the north side. You don't need BI software for it.</p>

<h2>What you can skip (for now)</h2>

<ul>
<li><strong>Route optimization.</strong> At under 20 drops per driver per day, your drivers already know the good routes. It starts paying off when several drivers are each running 30 or more stops.</li>
<li><strong>Real-time GPS tracking.</strong> Nice to have, but it adds cost and setup. Unless a client specifically asks for live tracking, it won't bring in more revenue at small scale.</li>
<li><strong>Driver apps.</strong> Also a scale tool. If texting jobs to your drivers works today, it's fine until you have more drivers than you can keep straight in your head.</li>
</ul>

<h2>The software stack for a lean courier operation</h2>

<p>For most small courier businesses, a simple setup covers it:</p>

<ul>
<li><strong>Quote widget</strong> (like Qalt) on your website to capture and price incoming job requests</li>
<li><strong>A quotes dashboard</strong> to manage and respond to those requests</li>
<li><strong>Email notifications</strong> so a new request doesn't sit unseen</li>
<li><strong>A spreadsheet or simple CRM</strong> for client and job history until you outgrow it</li>
</ul>

<p>A sophisticated stack won't help much if you're still missing jobs because nobody could get a price. Fix that first, and add more software when the volume actually calls for it.</p>

<p><a href="/register">See how Qalt handles quoting for small couriers. The Starter plan is free, and you can upgrade when you need Pro features.</a></p>
    `.trim(),
  },
  {
    slug: "real-time-shipping-quote-widget",
    title: "Real-Time Shipping Quote Widget: What It Is and Why Courier Businesses Need One",
    description: "A real-time shipping quote widget lets customers price a delivery on your website in seconds. How it works and why it matters for courier companies.",
    date: "2026-03-20",
    readTime: "5 min read",
    category: "Product",
    content: `
<p>A real-time shipping quote widget is a form on your website that calculates a delivery price on the spot from the customer's pickup location, drop-off location, and shipment details. The customer fills it in and sees a price a few seconds later, without calling or waiting on an email.</p>

<p>For a courier or delivery business, few changes to a website pay off as directly. The rest of this post covers how these widgets work and what separates a good one.</p>

<h2>How a real-time quote widget works</h2>

<p>The widget asks the customer for a few things:</p>
<ul>
<li>Pickup zip code or address</li>
<li>Drop-off zip code or address</li>
<li>Package size or weight</li>
<li>Service type (same-day, next-day, scheduled, etc.)</li>
<li>Any special requirements (stairs, inside delivery, after-hours)</li>
</ul>

<p>It then works out the driving distance between the two points and applies your pricing rules: base rate per mile, your minimum charge, and any surcharges that apply. A 12-mile same-day run with a third-floor walk-up gets priced the way you'd price it yourself, and the customer sees the estimate right away.</p>

<p>Most good widgets also collect the customer's name, email, and phone number along the way, so every quote becomes a lead you can follow up on.</p>

<h2>Why "real-time" matters</h2>

<p>When the only way to get a price is to call or email, some people simply won't. They're comparing two or three couriers, and the one that answers first usually gets the booking. If a competitor shows a price in 30 seconds and you ask people to wait for a callback, a lot of them won't come back.</p>

<p>Real-time also means the quote doesn't depend on you being free. A customer at 11pm on a Sunday can get a price and submit a request, and it will be in your dashboard when you wake up.</p>

<h2>The difference between a shipping calculator and a quote widget</h2>

<p>Generic shipping calculators, like the rate tools from FedEx or UPS, use carrier rates and are built for parcel shipping. They know nothing about your rate per mile, your minimums, or the kinds of jobs you run.</p>

<p>A delivery quote widget built for courier companies runs on pricing you set: base rate, minimum charge, extras. The estimate the customer sees is what you'd actually charge for that job, rather than a carrier's zone-based parcel rate.</p>

<h2>What to look for</h2>

<ul>
<li><strong>Your pricing, not generic rates.</strong> The widget should use your rules.</li>
<li><strong>Lead capture.</strong> Collects name, email, and phone before or after showing the quote.</li>
<li><strong>Easy embed.</strong> One code snippet you can paste anywhere.</li>
<li><strong>White-label design.</strong> Your logo and your colors, so it doesn't look bolted on.</li>
<li><strong>A dashboard to manage quotes.</strong> So you can see, respond to, and track every incoming request.</li>
</ul>

<p>Qalt was built for local and regional courier companies that want customers to get a price from their own website. <a href="/register">Start free on the Starter plan and upgrade when you need Pro features.</a></p>
    `.trim(),
  },
  {
    slug: "courier-company-online-leads",
    title: "How Courier Companies Can Get More Online Leads Without Cold Calling",
    description: "Cold calling eats hours and rarely lands a client. Three ways courier and delivery companies can bring in steady online leads instead.",
    date: "2026-03-22",
    readTime: "6 min read",
    category: "Growth",
    content: `
<p>Most small courier companies find new clients the same way: word of mouth, referrals, and now and then a cold call. That can carry a business for years. The trouble is that referrals come when they come, and cold calling burns hours for very few yeses. It's hard to plan hiring or buy a second van when you can't predict where next month's work is coming from.</p>

<p>Online lead generation works differently because it keeps running when you're busy. A customer can find you, get a price, and send a request while you're unloading at a job site. Below are the three approaches that tend to work for couriers.</p>

<h2>1. Your website's quote tool is your best salesperson</h2>

<p>Someone who lands on a courier website usually isn't browsing for fun. They have a job in mind, maybe a set of blueprints that has to reach a job site by noon. If they can get a price in 30 seconds, many of them will submit a request. If they have to call, plenty won't.</p>

<p>A delivery quote widget catches that person while they're ready to book. You get their name, email, phone, pickup and drop-off, and an estimate before you've spoken to them. Then you follow up with a confirmed price and take the job.</p>

<p>For most courier businesses, this is the cheapest way to get more out of the traffic the site already gets. Everyone who submits a request after seeing a price came to you and already knows roughly what it costs.</p>

<h2>2. Local SEO makes you findable without ads</h2>

<p>When a business owner in your city needs a courier, they search something like "same-day delivery service [city name]" or "courier company near me." If your website doesn't show up for those searches, you're invisible to them.</p>

<p>Local SEO for courier companies starts with three pieces:</p>

<ul>
<li><strong>Google Business Profile.</strong> Claim it, fill out every field, add photos of your vehicles, and ask clients for reviews. This is what shows up in the map results.</li>
<li><strong>Service area pages.</strong> Give each city or area you serve its own page. A "Same-Day Courier Service in [City]" page can rank for local searches and bring in people who are ready to book.</li>
<li><strong>Content about what you do.</strong> Posts that answer what your customers actually search, like "how much does local delivery cost" or "how to ship a package same day," build up search traffic over time.</li>
</ul>

<p>Local SEO is slower than paid ads, but it lasts. A page you publish today can keep bringing in requests for years.</p>

<h2>3. Strategic partnerships compound over time</h2>

<p>The lead source couriers overlook most is other local businesses with steady delivery needs: law firms with filings to run, medical offices sending specimens to a lab, online shops that need local orders delivered, event companies that need something across town by 5pm.</p>

<p>These aren't cold leads. They already need a courier every week, and the one they settle on tends to keep the work. A pharmacy doing 30 local drops a week, or a title company with daily document runs, can become the steady base that the rest of your schedule is built around.</p>

<p>You can meet them at local business events, on LinkedIn, or by contacting office managers and operations people directly. Keep the pitch short: "We handle same-day local delivery in [city]. This is what we charge. Want to try us on your next run?"</p>

<h2>The system that ties it together</h2>

<p>None of this helps if leads get lost once they arrive. You need a quote tool on the website, a dashboard where requests land, and an email alert when a new one comes in. With that in place, the traffic you earn from SEO and partnerships turns into booked jobs.</p>

<p><a href="/register">Start with Qalt's free Starter plan and upgrade when you need Pro features.</a></p>
    `.trim(),
  },
  {
    slug: "automate-delivery-pricing-website",
    title: "How to Automate Delivery Pricing on Your Website",
    description: "Stop quoting by hand. How courier businesses can set up automated delivery pricing that produces an accurate estimate for any job on the spot.",
    date: "2026-03-25",
    readTime: "5 min read",
    category: "How-To",
    content: `
<p>Manual quoting eats a surprising amount of a courier owner's day. A customer calls, you take down the addresses, look up the mileage, do the math, and send a number. Sometimes they never answer. Do that 10 to 20 times a day and you've lost hours to a job a computer can do the same way every time.</p>

<p>This post walks through how automated delivery pricing works and how to set it up on your website.</p>

<h2>The components of automated delivery pricing</h2>

<p>Automated pricing depends on three pieces working together:</p>

<ol>
<li><strong>Distance calculation.</strong> The tool has to work out the distance between pickup and drop-off on its own. This usually comes from a maps service that returns driving distance in miles.</li>
<li><strong>Your pricing rules.</strong> Your base rate per mile, minimum charge, and any surcharges (after-hours, stairs, inside delivery, weight) get entered once.</li>
<li><strong>A customer-facing form.</strong> A widget on your site where customers enter their details and see a price without you being involved.</li>
</ol>

<p>With those in place, the customer enters pickup and drop-off, the system measures the route, applies your rules, and shows an estimate. Nobody on your end has to touch it.</p>

<h2>How to configure your pricing rules</h2>

<p>Automated quotes are only as accurate as the rules behind them, so think these through:</p>

<ul>
<li><strong>Base rate per mile.</strong> Your core number. If you charge $2.50 a mile, that goes here. Set it from your fuel, driver time, and the margin you want, not from a guess.</li>
<li><strong>Minimum charge.</strong> A 2-mile run at a pure per-mile rate doesn't cover the time it takes to park, load, and walk the package in. A minimum (say $35) keeps short jobs worth doing.</li>
<li><strong>Service type pricing.</strong> A rush job that has to be there in two hours should cost more than a next-day scheduled drop. Set a multiplier or flat surcharge for each service level.</li>
<li><strong>Extra fees.</strong> Stairs, inside delivery, oversized items, and after-hours work all cost you more. Each one should be a fee the customer can select, so a pallet that needs a liftgate isn't priced like an envelope.</li>
</ul>

<p>Once that's set, the system does the math. You don't check every quote; you look at the requests that come in and decide which jobs to take.</p>

<h2>Setting it up</h2>

<p>With Qalt, setup takes about 10 minutes:</p>

<ol>
<li>Create an account and enter your pricing rules on the Pricing Settings page.</li>
<li>Customize the widget's look: your logo, color, and header text.</li>
<li>Copy your embed code and paste it into your website (one iframe snippet).</li>
</ol>

<p>From then on, anyone who visits your site can get an instant quote based on your real pricing. Requests arrive in your dashboard with the job details attached. You confirm, contact the customer, and run the delivery.</p>

<h2>What you review, what the system handles</h2>

<p>Automation doesn't take you out of the loop entirely. The system prices the job and captures the customer's details. You still decide which jobs to accept, coordinate the delivery, and follow up. What goes away is the back-and-forth over what to charge.</p>

<p>That frees up time you were spending on the phone, and customers no longer have to wait on you to find out whether your price works for them.</p>

<p><a href="/register">Set up automated delivery pricing on your site with Qalt. The free Starter plan needs no card. Upgrade when you need Pro features.</a></p>
    `.trim(),
  },
  {
    slug: "local-delivery-company-website-tips",
    title: "5 Things Every Local Delivery Company Website Needs",
    description: "Most courier company websites lose customers before anyone makes contact. Five things that fix that and turn more visitors into quote requests.",
    date: "2026-03-28",
    readTime: "5 min read",
    category: "Industry",
    content: `
<p>Most courier company websites fall into one of two camps. Some show a phone number and not much else. Others list every service in detail but give visitors no way to act on it. Either way, people leave without booking.</p>

<p>These are the five things a local delivery company website needs if you want visitors to turn into customers.</p>

<h2>1. An instant quote tool</h2>

<p>This one matters most. If a customer has to call to get a price, a lot of them won't bother and will try the next result instead. A delivery quote widget lets them enter the job and see an estimate right away, and that's usually what decides whether they send you a request or keep looking.</p>

<p>The quote tool should use your actual pricing (not generic carrier rates), collect the customer's contact information, and notify you so you can follow up quickly. If you only fix one thing on your site, fix this.</p>

<h2>2. Clear service area</h2>

<p>The first thing a customer wants to know is whether you go where they need you to. Put your service area on the homepage, not in the About page. If you serve specific cities, name them. If you serve a radius, spell it out: "We deliver anywhere within 50 miles of downtown Chicago."</p>

<p>People who aren't sure you cover their zip code rarely call to check. They pick a courier whose site makes it obvious.</p>

<h2>3. Pricing transparency (or a way to get it fast)</h2>

<p>Visitors are trying to decide whether you fit their budget. You don't need to publish a full rate sheet, but you should either show ballpark pricing or let them get an instant quote (see #1). A page that just says "Contact us for pricing" sends a lot of people back to the search results.</p>

<h2>4. Social proof</h2>

<p>A line from a real business you deliver for does more than any marketing copy. Two or three short quotes, something like "We use [Company] for all our document runs, and they've never missed a court deadline," give a first-time customer enough confidence to submit a request.</p>

<p>If you don't have testimonials yet, ask your best clients. Most will happily give you a sentence or two if you make it easy, for example by sending a draft they can edit.</p>

<h2>5. Fast contact options</h2>

<p>Some customers will still want to talk before booking, especially for odd jobs like a piano on a third-floor walk-up. Give them a visible phone number, a contact form that actually reaches you, and a business email. Answer quickly, too. If someone emails and hears nothing for a day, they've probably booked someone else.</p>

<p>The instant quote tool takes care of routine jobs, and the contact options are there for the unusual ones.</p>

<hr/>

<p>If your site is missing any of these, start with the quote tool, since it has the most direct effect on how many requests you get. <a href="/register">Add one to your site with Qalt in minutes.</a></p>
    `.trim(),
  },
  {
    slug: "small-courier-compete-amazon-delivery",
    title: "How Small Couriers Can Compete With Amazon Same-Day Delivery",
    description: "Amazon has the logistics infrastructure. Small couriers have advantages Amazon can't copy. How to position your business and win the work Amazon doesn't do.",
    date: "2026-04-01",
    readTime: "7 min read",
    category: "Industry",
    content: `
<p>If you run a local courier business, Amazon can feel like it's everywhere. They offer same-day and next-day delivery at huge scale, with tracking and a name customers already trust. It's fair to wonder where that leaves a company with four vans.</p>

<p>Trying to beat Amazon at its own game is a losing plan. The better move is to compete where Amazon's model doesn't reach, and to make sure the customers who need that kind of service can find you.</p>

<h2>Where Amazon can't follow you</h2>

<h3>Specialized and sensitive cargo</h3>
<p>Amazon delivers consumer products. They don't run a signed legal filing to the courthouse with a chain of custody. They don't move lab specimens that have to stay cold. They don't carry a framed piece of art up to a client's office and hang around until someone signs for it. Local couriers do a different job for businesses with needs like these.</p>

<p>If your clients are law firms, clinics, banks, or anyone else with handling or compliance requirements, Amazon isn't really your competition. You're serving a market they don't touch.</p>

<h3>Local relationships and flexibility</h3>
<p>A small courier can take a call at 7am for a job that has to be done by 10am. You can talk to the client directly, handle a last-minute address change, and bend in ways a large platform won't. Business clients who need a real person to call when something goes sideways value that a lot.</p>

<h3>True local knowledge</h3>
<p>You know your city. You know which buildings have a loading dock nobody can find, which ones make you check in at a security desk, and which freeway to stay off after 4pm. That kind of knowledge takes years to build, and a routing algorithm doesn't have it.</p>

<h2>How to make sure customers can find you</h2>

<p>Where Amazon really beats small couriers is being the first name people think of. Customers default to it because nothing else comes to mind. You fix that by showing up when they search for a local alternative.</p>

<ul>
<li><strong>Local SEO.</strong> Rank for "[city] same-day courier," "[city] local delivery service," and similar searches. That takes a Google Business Profile, service area pages on your website, and content that shows you know local delivery.</li>
<li><strong>Industry-specific positioning.</strong> If you specialize in medical, legal, or B2B delivery, build pages that speak to those customers directly. "Medical specimen courier in [city]" is a narrower search than "courier service," and the people typing it usually need someone today.</li>
<li><strong>Online quote tool.</strong> When a customer lands on your site, they should be able to act right away. An instant quote widget turns a visitor into a request without making them call. Most business customers now expect to see a price online.</li>
</ul>

<h2>Play to your strengths, not Amazon's</h2>

<p>Competing with Amazon on volume, consumer goods, or price per standard package won't work. Most of your clients hire you for something Amazon has no interest in doing.</p>

<p>Build your name in that niche, show up when people search for it, and let them book you without a phone call.</p>

<p><a href="/register">Add an instant quote tool to your courier website with Qalt. Start free, or upgrade when you need Pro features.</a></p>
    `.trim(),
  },
  {
    slug: "stop-phone-quotes-courier-business",
    title: "The Real Cost of Phone Quotes for a Courier Business",
    description: "Every quote you give over the phone takes time and risks losing the lead. How to move routine quotes to your website with automated online pricing.",
    date: "2026-04-03",
    readTime: "5 min read",
    category: "Operations",
    content: `
<p>Phone quotes feel like good customer service. You're talking to the customer, hearing what they need, getting to know them. Add up the time, though, and phone quoting turns out to be one of the more expensive habits in a courier business. It also loses you customers you never find out about.</p>

<h2>The hidden cost of phone quotes</h2>

<p>A phone quote costs more than it looks like:</p>

<ul>
<li><strong>Your time.</strong> A quote call runs 3 to 7 minutes once you count the call, the math, and the follow-up questions. At 15 calls a day, that's more than an hour of every day spent talking prices instead of running jobs.</li>
<li><strong>Someone has to be there to pick up.</strong> During business hours, you or someone else is tied to the phone. If you're backing a van up to a dock when it rings, that lead may be gone.</li>
<li><strong>Customers you never hear from.</strong> People who find your site after hours, on weekends, or who just don't like calling look around, see no price, and leave. You have no record they were ever there.</li>
</ul>

<h2>What customers actually prefer</h2>

<p>Plenty of customers would rather see a price before they talk to anyone. You've probably done the same thing yourself when hiring a plumber or a moving company. They're not avoiding people. They just want to know the number before committing to a conversation.</p>

<p>Give them the price up front and the calls you still get change. They come from people who already like your rate and want to confirm a pickup time or ask about something unusual, like whether you can take a pallet that needs a liftgate.</p>

<h2>What to replace phone quotes with</h2>

<p>An automated quote widget on your website does what a phone quote does, without the phone call:</p>

<ul>
<li>Customer enters pickup and drop-off location</li>
<li>System calculates distance and applies your pricing rules</li>
<li>Customer gets an instant estimate and submits their contact info</li>
<li>You get a notification with all the job details</li>
</ul>

<p>You still follow up. The difference is that you're calling people who have seen your price and asked for the job, rather than doing math on the phone for someone who may never book.</p>

<h2>How to transition away from phone quotes</h2>

<ol>
<li><strong>Install a quote widget on your website.</strong> Most of the routine requests that come in by phone can go through it instead.</li>
<li><strong>Update your Google Business Profile.</strong> Put your website link front and center so searchers land there before they dial.</li>
<li><strong>Change your voicemail.</strong> Something like "For a quick quote, visit [website]. For anything else, leave a message." Routine requests go online and you're still reachable for the complicated ones.</li>
<li><strong>Turn on email notifications.</strong> Every new online request lands in your inbox right away, so nothing slips through that would have come in by phone.</li>
</ol>

<p>Once routine quotes move online, you spend less of the day on the phone, fewer after-hours visitors slip away, and customers get their answer without waiting for a callback.</p>

<p><a href="/register">Replace phone quotes with automated online pricing. Qalt has a free plan, and Upgrade when you need Pro features.</a></p>
    `.trim(),
  },
  {
    slug: "how-to-price-delivery-services",
    title: "How to Price Delivery Services: A Practical Guide for Courier Businesses",
    description: "Pricing delivery services takes more than picking a rate per mile. How to build courier pricing that covers your real costs without undercutting yourself.",
    date: "2026-04-05",
    readTime: "8 min read",
    category: "Operations",
    content: `
<p>Pricing may be the biggest decision in a courier business, and it gets surprisingly little thought. A lot of operators price by gut, copy a competitor, or keep whatever they charged the week they started. That's how you end up with jobs that lose money, quotes that change depending on who answered the phone, and money left on the table.</p>

<p>The approach below starts from what a job costs you and builds up from there.</p>

<h2>Start with your cost floor</h2>

<p>You can't price for profit until you know what a job actually costs. The main pieces:</p>

<ul>
<li><strong>Fuel cost per mile.</strong> Your vehicle's MPG and local fuel prices give you a per-mile fuel cost. At 20 MPG and $3.50 a gallon, that's $0.175 a mile in fuel alone.</li>
<li><strong>Vehicle depreciation and maintenance.</strong> Work vehicles wear out fast. Take last year's spending on tires, brakes, oil changes, and repairs, add a share of what the van will cost to replace, and divide by the miles you drove. That's your wear cost per mile.</li>
<li><strong>Driver time.</strong> What's your real hourly rate once you count driving, loading and unloading, and paperwork? A job that takes 90 minutes at a $30/hour target costs $45 in labor before any other expense.</li>
<li><strong>Insurance and overhead.</strong> Commercial auto insurance, business insurance, software, and other fixed costs have to be spread across all your jobs.</li>
</ul>

<p>Add those up and you have your cost floor: the least you can charge on a job without losing money. Everything above it is margin.</p>

<h2>Structure your pricing</h2>

<p>Most courier pricing that works has three parts.</p>

<h3>Base rate per mile</h3>
<p>This covers fuel, vehicle costs, and driver time for the driving part of the job. Rates vary a lot by market, vehicle, and service level. A cargo van in a big metro prices differently from a sedan in a small town. Work yours out from your own costs plus the margin you want instead of copying someone else's number.</p>

<h3>Minimum charge</h3>
<p>Short jobs don't bring in enough at a per-mile rate to justify the time. A 2-mile run still means parking, walking the package in, and getting a signature. Set your minimum from the least time any job takes you, priced at your hourly rate. If the shortest job takes you 40 minutes door to door, your minimum should cover 40 minutes of your time.</p>

<h3>Surcharges for extras</h3>
<p>Anything that adds real cost to a job should have its own fee:</p>
<ul>
<li>After-hours or weekend delivery</li>
<li>Stairs or elevator-required delivery</li>
<li>Inside delivery (vs. curbside)</li>
<li>Oversized or heavy items</li>
<li>Rush/priority service</li>
<li>Signature required or chain of custody documentation</li>
</ul>

<p>Carrying a 60-pound box up to a third-floor walk-up takes longer than leaving an envelope with a receptionist. Charge for that rather than folding it into your base rate.</p>

<h2>Stay competitive without racing to the bottom</h2>

<p>It helps to know what competitors charge, but trying to beat the cheapest one is a race you don't want to win. A better approach:</p>

<ul>
<li>Know the low, middle, and high end of your local market</li>
<li>Position on what you're genuinely good at (reliability, a specialty, long client relationships)</li>
<li>Price for the customers you want, not for everyone</li>
</ul>

<p>Clients like law firms, clinics, and banks often care more about reliability and accountability than about saving a few dollars a run. With them, compete on service rather than price.</p>

<h2>Make your pricing easy to understand</h2>

<p>If customers can't quickly figure out what they'll pay, they hesitate or go elsewhere. An online quote tool fixes this by applying your rules for them and showing an estimate without making them understand the formula.</p>

<p>It also keeps you consistent. Everyone gets the same price for the same job, which builds trust and cuts down on haggling.</p>

<p><a href="/register">Set up your pricing in Qalt and automate your quotes. Start free on the Starter plan and upgrade when you need Pro features.</a></p>
    `.trim(),
  },
  {
    slug: "capture-leads-courier-website",
    title: "The Best Way to Capture Leads on a Courier Company Website",
    description: "Most courier websites work like brochures. How to set yours up to capture quote requests and contact details, even when nobody is at the desk.",
    date: "2026-04-08",
    readTime: "6 min read",
    category: "Growth",
    content: `
<p>A courier website that only lists your services and a phone number isn't pulling its weight. Every visitor is a possible customer, but without a way to capture who they are and what they need, most of them leave and you never hear about it.</p>

<p>Turning the site into something that brings in work takes a few specific pieces, covered below.</p>

<h2>Understand the conversion moment</h2>

<p>A visitor becomes a lead when they do something that puts them on your list. For a courier business, that's almost always a quote request. It's the point where someone goes from looking around to asking you to do a job.</p>

<p>Everything on your site should either push visitors toward that step or capture their details when they take it. Every extra click or unanswered question between a visitor and a quote request costs you some of them.</p>

<h2>The highest-converting lead capture: instant quote widget</h2>

<p>For courier websites, an embedded instant quote widget tends to beat contact forms and "call us" buttons, for a few reasons:</p>

<ul>
<li><strong>It gives before it asks.</strong> The customer gets something useful (a price) in exchange for their contact info. That feels like a fair trade, so more people finish the form.</li>
<li><strong>It qualifies leads for you.</strong> Someone who sees your price and still submits a request already knows what you charge and wants the job done. That's a much better lead than a blank contact form.</li>
<li><strong>It captures useful detail.</strong> You get name, email, phone, pickup, drop-off, service type, and the estimated price, which is everything you need for a proper follow-up call.</li>
<li><strong>It works 24/7.</strong> Nobody has to be by the phone. A customer at midnight on a Sunday can get a quote and send a request that's waiting in your dashboard Monday morning.</li>
</ul>

<h2>Supporting lead capture elements</h2>

<p>The quote widget does most of the work. A few other pieces back it up.</p>

<h3>Clear CTAs throughout the page</h3>
<p>Don't make visitors hunt for the quote tool. Put "Get an Instant Quote" buttons in your hero section, below your services, and after your testimonials. Each one should jump to or open the widget.</p>

<h3>Contact form for non-standard requests</h3>
<p>Some jobs don't fit a standard quote: a standing contract for daily bank runs, an unusual load, a big one-time volume. A simple contact form catches those so they don't leave when the widget doesn't cover their situation.</p>

<h3>Phone number for high-intent callers</h3>
<p>Some customers, often longtime business owners, would still rather call. Keep your number visible. Just don't make it your main way of capturing leads; treat it as the backup for people who won't use the online tool.</p>

<h2>The follow-up system</h2>

<p>Capturing a lead is only worth something if you follow up well. When a quote request comes in:</p>

<ol>
<li>Get notified right away (an email notification from your quote tool)</li>
<li>Respond within a few hours, sooner if you can, because the courier who calls back first often gets the job</li>
<li>Confirm the estimated price, or adjust it if the job has details the widget didn't capture</li>
<li>Make booking easy by telling the customer exactly what happens next</li>
</ol>

<p>Quick capture through the widget plus a quick callback from you is how website visitors become paying customers.</p>

<h2>Measure what's working</h2>

<p>Once the system is running, keep an eye on it. How many quote requests come in each week? How many do you close? Which kinds of jobs book and which go quiet? The answers tell you whether to work on traffic, on the site itself, or on your follow-up. Qalt Pro includes analytics on your quote requests to help with this.</p>

<p>Start with the quote widget and build from there. <a href="/register">Add one to your site with Qalt. The free Starter plan needs no card. Upgrade when you need Pro features.</a></p>
    `.trim(),
  },
];

const allBlogPosts: BlogPost[] = [...seoBlogPosts, ...blogPosts];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allBlogPosts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...allBlogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
