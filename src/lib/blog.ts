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
    description: "A step-by-step guide for courier and delivery companies who want to give customers instant delivery quotes online — without lifting the phone.",
    date: "2026-03-15",
    readTime: "6 min read",
    category: "How-To",
    content: `
<p>If you run a delivery or courier business, you already know the drill: a potential customer visits your website, can't find a price, and calls or emails you to ask. You stop what you're doing, gather the details, do the math, and send a quote. Half the time they don't even respond.</p>

<p>That's not a sales funnel — it's a phone tag marathon. A delivery price calculator on your website fixes this. Customers get an instant estimate, you get a lead, and nobody has to interrupt their day.</p>

<h2>What is a delivery price calculator?</h2>

<p>A delivery price calculator is a widget or tool embedded on your website that lets customers enter their pickup and drop-off details — zip codes, package size, service type — and get an estimated price in seconds. The calculator uses your pricing rules (base rate per mile, minimum charge, surcharges) to generate the quote automatically.</p>

<p>The best ones also capture the customer's name, email, and phone number before showing the price, turning every quote request into a lead in your dashboard.</p>

<h2>Why manual quoting is hurting your business</h2>

<ul>
<li><strong>You lose leads while they wait.</strong> If a customer can't get a price instantly, they move on to the next result. Competitors with online quote tools win those customers by default.</li>
<li><strong>Your time is worth more.</strong> Even if a quote takes 3 minutes, 20 quotes a day is an hour of your day spent on a task that software can do in seconds.</li>
<li><strong>Phone leads don't scale.</strong> You can only take so many calls. An online calculator works 24/7 — even while you're on the road.</li>
</ul>

<h2>What to look for in a delivery price calculator</h2>

<p>Not all quote tools are built the same. Here's what matters:</p>

<ul>
<li><strong>Your pricing rules, not generic estimates.</strong> The tool should use your actual rate per mile, your minimum charge, and any extras you charge (stairs, inside delivery, after-hours). A generic shipping calculator won't work for local courier pricing.</li>
<li><strong>Lead capture built in.</strong> The calculator should collect name, email, and phone before or after showing the quote — and store those leads somewhere you can act on them.</li>
<li><strong>White-label appearance.</strong> It should look like part of your site, not a third-party widget. That means your logo, your colors, your button text.</li>
<li><strong>Easy installation.</strong> You should be able to paste one embed code into your website and be done. No developer required.</li>
</ul>

<h2>How to install one on your website</h2>

<p>With Qalt, the process takes about 10 minutes:</p>

<ol>
<li><strong>Sign up and enter your pricing.</strong> Set your base rate per mile, minimum charge, and any service extras. Qalt handles the math from there.</li>
<li><strong>Customize the appearance.</strong> Upload your logo, set your brand color, and customize the header and button text so it feels native to your site.</li>
<li><strong>Copy your embed code.</strong> You'll get a single iframe snippet tied to your account.</li>
<li><strong>Paste it into your website.</strong> Drop it into a Custom HTML block in WordPress, an Embed element in Webflow, or an HTML block in Shopify. That's it.</li>
</ol>

<p>Once it's live, every quote request shows up in your Qalt dashboard with the customer's contact info and the estimated price. You follow up — or set up email notifications so leads arrive in your inbox automatically.</p>

<h2>The ROI is immediate</h2>

<p>Delivery companies that add an online quote calculator typically see two things happen fast: fewer phone calls for basic pricing questions, and more inbound leads — because customers who would have bounced can now get an answer instantly.</p>

<p>If your current website has no quote tool and you're competing against companies that do, adding one is the single highest-leverage thing you can do this week.</p>

<p>Ready to get started? <a href="/register">Create your free Qalt account</a> and have your delivery price calculator live today.</p>
    `.trim(),
  },
  {
    slug: "last-mile-delivery-software-small-couriers",
    title: "Last Mile Delivery Software for Small Couriers: What You Actually Need",
    description: "Most last mile delivery software is built for enterprise fleets. Here's what small courier companies actually need — and what to skip.",
    date: "2026-03-18",
    readTime: "7 min read",
    category: "Industry",
    content: `
<p>The phrase "last mile delivery software" usually conjures images of enterprise platforms with route optimization engines, fleet management dashboards, and six-figure annual contracts. If you run a small courier business — a handful of drivers, local routes, regional clients — most of that software is overkill and overpriced.</p>

<p>But that doesn't mean you should be running your operation on spreadsheets and WhatsApp. There's a category of tools specifically useful for smaller operations. This post breaks down what actually matters.</p>

<h2>What "last mile" actually means</h2>

<p>Last mile delivery refers to the final leg of a shipment's journey — from a distribution hub or pickup point to the end customer. For small couriers, this is essentially your entire business: you pick something up and you deliver it. The "last mile" problem in logistics is that this segment is the most expensive and time-consuming per package, largely because it's hard to optimize individual stops across a city.</p>

<h2>What small couriers actually need from software</h2>

<p>Forget the enterprise feature checklist. Here's what moves the needle for a small operation:</p>

<h3>1. Online quote capture</h3>
<p>Before you can route or dispatch anything, you need the job. If customers have to call you to get a price, you're losing leads to competitors who have online quote tools. A delivery quote widget on your website captures job requests with all the details you need — pickup zip, drop-off zip, package info, service type — so you can price and accept jobs without a phone call.</p>

<h3>2. Job management</h3>
<p>A simple dashboard where you can see all incoming requests, mark jobs as accepted or completed, and add internal notes. This doesn't need to be complex — a clean list with status filters is often enough for operations under 50 jobs per day.</p>

<h3>3. Customer communication</h3>
<p>Automated email confirmations when a quote is submitted or a job is accepted go a long way. Customers want to know their request was received. Setting up email notifications keeps customers informed without you having to send manual messages.</p>

<h3>4. Basic reporting</h3>
<p>How many jobs did you complete this month? What's your average job value? Which zip codes generate the most volume? You don't need BI software — a simple analytics view with those numbers is enough to make informed decisions about pricing and capacity.</p>

<h2>What you can skip (for now)</h2>

<ul>
<li><strong>Route optimization.</strong> Useful at scale, but at under 20 drops per driver per day, your drivers already know the efficient routes. This becomes valuable when you're running multiple drivers with 30+ stops each.</li>
<li><strong>Real-time GPS tracking.</strong> Nice to have, but adds cost and complexity. Unless your clients specifically require live tracking visibility, it's not a revenue driver at small scale.</li>
<li><strong>Driver apps.</strong> Again — useful at scale. If you're communicating jobs to drivers via text or a group chat today, that's fine until you're managing more drivers than you can keep track of manually.</li>
</ul>

<h2>The software stack for a lean courier operation</h2>

<p>For most small courier businesses, the right stack is simple:</p>

<ul>
<li><strong>Quote widget</strong> (like Qalt) on your website to capture and price incoming job requests</li>
<li><strong>A quotes dashboard</strong> to manage and respond to those requests</li>
<li><strong>Email notifications</strong> so you never miss a new request</li>
<li><strong>A spreadsheet or simple CRM</strong> for tracking clients and job history until you outgrow it</li>
</ul>

<p>The goal isn't to have the most sophisticated stack — it's to stop losing leads and stop spending time on tasks that software handles better. Start there, and add complexity only when the operation demands it.</p>

<p><a href="/register">See how Qalt handles the quoting side for small couriers — free to try.</a></p>
    `.trim(),
  },
  {
    slug: "real-time-shipping-quote-widget",
    title: "Real-Time Shipping Quote Widget: What It Is and Why Courier Businesses Need One",
    description: "A real-time shipping quote widget lets customers price their delivery instantly on your website. Here's how it works and why it matters for courier companies.",
    date: "2026-03-20",
    readTime: "5 min read",
    category: "Product",
    content: `
<p>A real-time shipping quote widget is a tool embedded on your website that calculates and displays a delivery price instantly — based on the customer's pickup location, drop-off location, and shipment details. No wait, no phone call, no email thread. The customer enters their info and sees a price in seconds.</p>

<p>For courier and delivery businesses, this is one of the highest-leverage additions you can make to your website. Here's why.</p>

<h2>How a real-time quote widget works</h2>

<p>The widget collects a few inputs from the customer:</p>
<ul>
<li>Pickup zip code or address</li>
<li>Drop-off zip code or address</li>
<li>Package size or weight</li>
<li>Service type (same-day, next-day, scheduled, etc.)</li>
<li>Any special requirements (stairs, inside delivery, after-hours)</li>
</ul>

<p>It then calculates the distance between the two points and applies your pricing rules: a base rate per mile, your minimum charge floor, and any applicable surcharges. The result is a price estimate — displayed to the customer in real time.</p>

<p>Most good widgets also collect the customer's name, email, and phone number as part of the flow, so every quote becomes a lead you can follow up on.</p>

<h2>Why "real-time" matters</h2>

<p>The alternative — asking customers to call or email for a quote — has a serious conversion problem. Studies on service business websites consistently show that the longer a customer has to wait for a price, the less likely they are to convert. If your competitor has a widget and you don't, the customer gets their answer in 30 seconds from your competitor and never comes back to you.</p>

<p>Real-time means the quote is instant. There's no queue, no wait, no dependency on your availability. A customer at 11pm on a Sunday can get a price and submit a request — and it will be in your dashboard when you wake up.</p>

<h2>The difference between a shipping calculator and a quote widget</h2>

<p>Generic shipping calculators (like the ones built into FedEx or UPS rate tools) use carrier rates and are designed for parcel shipping. They don't reflect your local courier pricing — your rate per mile, your minimums, or your specific service types.</p>

<p>A delivery quote widget built for courier companies lets you configure your own pricing: base rate, minimum charge, extras. The estimate the customer sees reflects what you'd actually charge — not a carrier's zone-based parcel rate.</p>

<h2>What to look for</h2>

<ul>
<li><strong>Your pricing, not generic rates.</strong> The widget should use your rules.</li>
<li><strong>Lead capture.</strong> Collects name, email, phone before or after showing the quote.</li>
<li><strong>Easy embed.</strong> One code snippet, paste anywhere.</li>
<li><strong>White-label design.</strong> Your logo, your colors — not a third-party-looking tool.</li>
<li><strong>Dashboard to manage quotes.</strong> So you can see, respond to, and track all incoming requests.</li>
</ul>

<p>Qalt is built specifically for this use case — local and regional courier companies who want to turn their website into a quoting machine. <a href="/register">Try it free for 14 days.</a></p>
    `.trim(),
  },
  {
    slug: "courier-company-online-leads",
    title: "How Courier Companies Can Get More Online Leads Without Cold Calling",
    description: "Cold calling is expensive and inefficient. Here are three proven ways courier and delivery companies generate consistent online leads — and what makes them stick.",
    date: "2026-03-22",
    readTime: "6 min read",
    category: "Growth",
    content: `
<p>Most small courier companies get new clients the same way: word of mouth, referrals, and the occasional cold call. These work — until they don't. Referrals are unpredictable. Cold calling is time-consuming and has terrible conversion rates. And you can't build a scalable business on lead sources you can't control.</p>

<p>Online lead generation for courier companies is different. The right systems work while you're on the road, while you're sleeping, and when you're too busy to pick up the phone. Here's what actually works.</p>

<h2>1. Your website's quote tool is your best salesperson</h2>

<p>The highest-converting thing you can put on a courier company website is an instant quote tool. Here's why: customers who arrive at your site already want delivery services. They're not browsing — they have a job in mind. If they can get a price in 30 seconds, they'll submit a request. If they have to call, most of them won't.</p>

<p>A delivery quote widget captures the lead the moment intent is highest. You get their name, email, phone, pickup location, drop-off location, and an estimate — without having to talk to them first. You follow up with a confirmed price and close the job.</p>

<p>For most courier businesses, this single addition to their website is the biggest ROI move available. Every visitor who gets an instant quote and submits a request is a warm lead who came to you.</p>

<h2>2. Local SEO makes you findable without ads</h2>

<p>When a business owner in your city needs a courier, they search something like "same-day delivery service [city name]" or "courier company near me." If your website doesn't appear in those results, you don't exist to them.</p>

<p>Local SEO for courier companies starts with three things:</p>

<ul>
<li><strong>Google Business Profile.</strong> Claim it, fill it out completely, add photos, get reviews. This is what shows up in map results and local packs.</li>
<li><strong>Service area pages.</strong> Create a page for each city or zip code you serve. "Same-Day Courier Service in [City]" pages rank for local searches and send qualified traffic.</li>
<li><strong>Content about what you do.</strong> Blog posts targeting questions your customers search — like "how much does local delivery cost" or "how to ship a package same day" — build authority over time and bring in organic traffic.</li>
</ul>

<p>Local SEO is slower than ads but more durable. A page you build today can generate leads for years.</p>

<h2>3. Strategic partnerships compound over time</h2>

<p>The most underrated lead source for courier companies is partnerships with complementary businesses: law firms that need document courier runs, medical practices that ship specimens, e-commerce sellers who need local fulfillment, event companies that need same-day delivery.</p>

<p>These aren't cold outreach targets — they're businesses with recurring delivery needs who will send you jobs every week if you become their go-to courier. One good partnership can be worth 10-20 jobs per month indefinitely.</p>

<p>Find them at local business events, through LinkedIn, or by reaching out directly to office managers and operations contacts at the types of businesses you want to serve. The pitch is simple: "We handle same-day local delivery in [city]. Here's what we charge. Want to try us on your next job?"</p>

<h2>The system that ties it together</h2>

<p>Online lead generation only works if you can capture and respond to leads efficiently. A quote tool on your website, a dashboard where quotes arrive, and email notifications when a new request comes in — that's the infrastructure. Build that, and the leads you generate from SEO and partnerships actually convert instead of getting lost.</p>

<p><a href="/register">Start with Qalt's quote widget — free for 14 days.</a></p>
    `.trim(),
  },
  {
    slug: "automate-delivery-pricing-website",
    title: "How to Automate Delivery Pricing on Your Website",
    description: "Stop doing manual quotes. Here's how courier businesses can set up automated delivery pricing that calculates accurate estimates for any job — instantly.",
    date: "2026-03-25",
    readTime: "5 min read",
    category: "How-To",
    content: `
<p>Manual quoting is one of the biggest time sinks in a courier business. A customer calls, you gather the details, you estimate the distance, you do the math, you send a number — and sometimes they ghost you anyway. Multiply that by 10-20 quote requests a day and you're spending hours on a process that can be fully automated.</p>

<p>Here's how automated delivery pricing works and how to set it up on your website.</p>

<h2>The components of automated delivery pricing</h2>

<p>To automate pricing, you need three things working together:</p>

<ol>
<li><strong>Distance calculation.</strong> The tool needs to calculate the distance between the pickup and drop-off addresses automatically. This typically uses a maps API that returns driving distance in miles.</li>
<li><strong>Your pricing rules.</strong> Your base rate per mile, minimum charge, and any surcharges (after-hours, stairs, inside delivery, weight) need to be configured once in the system.</li>
<li><strong>A customer-facing interface.</strong> A form or widget where customers enter their details and get an instant price — without your involvement.</li>
</ol>

<p>When all three are in place, the flow is: customer enters pickup and drop-off → system calculates distance → applies your pricing rules → returns an estimate. Completely automatic.</p>

<h2>How to configure your pricing rules</h2>

<p>The accuracy of automated quotes depends on how well your pricing rules are configured. Here's what to think through:</p>

<ul>
<li><strong>Base rate per mile.</strong> Your core pricing variable. If you charge $2.50/mile, that goes here. Consider your fuel costs, driver time, and desired margin when setting this.</li>
<li><strong>Minimum charge.</strong> Local jobs under a few miles would be priced too low at pure per-mile rates. A minimum charge (e.g., $35 minimum) ensures you're not losing money on short runs.</li>
<li><strong>Service type multipliers.</strong> Same-day rush jobs should cost more than standard scheduled delivery. Configure multipliers or flat surcharges for each service tier.</li>
<li><strong>Extra fees.</strong> Stairs, inside delivery, oversized items, after-hours delivery — these add real cost. Each should have a corresponding fee customers can select.</li>
</ul>

<p>Once configured, the system handles the math. You don't review each quote manually — you review the leads that come in and decide whether to accept them.</p>

<h2>Setting it up</h2>

<p>With Qalt, setup takes about 10 minutes:</p>

<ol>
<li>Create an account and enter your pricing rules in the Pricing Settings page.</li>
<li>Customize the widget's appearance — your logo, color, header text.</li>
<li>Copy your embed code and paste it into your website (one iframe snippet).</li>
</ol>

<p>That's it. From that point on, every customer who visits your site can get an instant quote based on your real pricing. Requests arrive in your dashboard with all the job details — you confirm, contact the customer, and do the delivery.</p>

<h2>What you review, what the system handles</h2>

<p>Automation doesn't mean you're completely hands-off. The system handles pricing and lead capture; you handle accepting jobs, coordinating delivery, and following up on requests. But the manual quoting step — the back-and-forth to figure out what to charge — is gone.</p>

<p>For most courier businesses, that's a 1-2 hour daily time savings and significantly more leads converted, since customers don't have to wait for a response to know if your price works for them.</p>

<p><a href="/register">Set up automated delivery pricing on your site with Qalt — free for 14 days.</a></p>
    `.trim(),
  },
  {
    slug: "local-delivery-company-website-tips",
    title: "5 Things Every Local Delivery Company Website Needs",
    description: "Most courier company websites lose customers before they even make contact. These five elements fix that — and turn your site into a lead machine.",
    date: "2026-03-28",
    readTime: "5 min read",
    category: "Industry",
    content: `
<p>The average courier company website does one of two things: shows a phone number and calls it a day, or lists services without giving customers any way to take action. Both approaches leave money on the table.</p>

<p>Here are five things every local delivery company website needs to actually convert visitors into customers.</p>

<h2>1. An instant quote tool</h2>

<p>This is the most important one. If a customer visits your site and has to call to get a price, most of them won't call — they'll try the next result. A delivery quote widget lets customers enter their job details and get an estimate instantly. That's the difference between a visitor and a lead.</p>

<p>The quote tool should use your actual pricing (not generic carrier rates), collect the customer's contact information, and send you a notification so you can follow up quickly. Everything else on this list matters less than this one element.</p>

<h2>2. Clear service area</h2>

<p>Customers want to know immediately: do you deliver where I need you to? Make your service area prominent on the homepage — not buried in an About page. If you serve specific cities, name them. If you serve a radius, say it clearly ("We deliver anywhere within 50 miles of downtown Chicago").</p>

<p>Ambiguity here causes abandonment. If customers aren't sure you cover their area, they'll find a courier who makes it obvious.</p>

<h2>3. Pricing transparency (or a way to get it fast)</h2>

<p>Customers are making a buying decision. They need to know if your prices work for them. You don't have to publish a full rate sheet — but you should either show ballpark pricing or give customers a way to get an instant quote (see #1). "Contact us for pricing" is a conversion killer in 2026.</p>

<h2>4. Social proof</h2>

<p>A testimonial from a real business you've delivered for is worth more than any marketing copy. Even two or three short quotes — "We use [Company] for all our document runs. Fast and reliable." — build the trust that gets a first-time customer to hit submit on a quote request.</p>

<p>If you don't have testimonials yet, ask your best clients directly. Most are happy to provide a sentence or two if you make it easy for them.</p>

<h2>5. Fast contact options</h2>

<p>Some customers will still want to talk before booking. Make it easy: a visible phone number, a contact form that actually works, and ideally a business email. Response time matters too — if someone emails and doesn't hear back for 24 hours, they've already booked with someone else.</p>

<p>The best courier company websites have an instant quote tool that handles most requests automatically, with clear contact options for customers who need something non-standard. That combination covers the full range of how customers want to engage.</p>

<hr/>

<p>If your current website is missing any of these, the quote tool is the place to start — it has the biggest direct impact on leads and revenue. <a href="/register">Add one to your site with Qalt in minutes.</a></p>
    `.trim(),
  },
  {
    slug: "small-courier-compete-amazon-delivery",
    title: "How Small Couriers Can Compete With Amazon Same-Day Delivery",
    description: "Amazon has the logistics infrastructure. Small couriers have advantages Amazon can't replicate. Here's how to position and win.",
    date: "2026-04-01",
    readTime: "7 min read",
    category: "Industry",
    content: `
<p>If you run a local courier business, Amazon looms large. They offer same-day and next-day delivery at scale, with tracking, reliability, and a brand customers already trust. How do you compete with that?</p>

<p>The answer isn't to out-Amazon Amazon. It's to compete on the dimensions where Amazon structurally cannot win — and make sure customers can find you when they need what you offer.</p>

<h2>Where Amazon can't follow you</h2>

<h3>Specialized and sensitive cargo</h3>
<p>Amazon handles consumer products. They don't courier legal documents that need a signature chain of custody. They don't transport medical specimens that need temperature control. They don't deliver high-value items that require white-glove handling. Local couriers fill a completely different function for businesses with specialized needs.</p>

<p>If you serve law firms, healthcare providers, financial institutions, or any industry with compliance or handling requirements, you're not competing with Amazon — you're serving a market Amazon doesn't touch.</p>

<h3>Local relationships and flexibility</h3>
<p>A small courier can take a call at 7am for a same-day job that needs to be done by 10am. They can communicate directly with the client, handle last-minute changes, and adapt in ways that a logistics platform cannot. For business clients who need reliability and a human they can call, this matters enormously.</p>

<h3>True local knowledge</h3>
<p>You know your city. You know which addresses have difficult loading docks, which buildings require specific access procedures, and which routes to avoid at rush hour. That local operational knowledge is a competitive advantage that takes years to build and can't be replicated by an algorithm.</p>

<h2>How to make sure customers can find you</h2>

<p>The fastest way Amazon beats small couriers isn't on service — it's on discoverability. Customers default to Amazon because it's the first thing they think of. The antidote is making sure you show up when they search for local delivery alternatives.</p>

<ul>
<li><strong>Local SEO.</strong> Rank for "[city] same-day courier," "[city] local delivery service," and similar searches. This requires a Google Business Profile, service area pages on your website, and content that establishes your authority for local delivery.</li>
<li><strong>Industry-specific positioning.</strong> If you specialize in medical, legal, or B2B delivery, create pages and content that speak directly to those audiences. "Medical specimen courier in [city]" is a more focused keyword than "courier service" — and the customers who search it are high-intent.</li>
<li><strong>Online quote tool.</strong> When a customer lands on your site, they need to be able to take action immediately. An instant quote widget turns a visitor into a lead without requiring them to call. This is table stakes in 2026.</li>
</ul>

<h2>Play to your strengths, not Amazon's</h2>

<p>Trying to compete with Amazon on volume, speed for consumer goods, or price for standard packages is a losing battle. But local couriers serve a completely different function for most of their clients — one that Amazon actively ignores.</p>

<p>Build your reputation in that space, make yourself easy to find online, and make it easy for clients to book you. That's the playbook that works.</p>

<p><a href="/register">Add an instant quote tool to your courier website — free with Qalt for 14 days.</a></p>
    `.trim(),
  },
  {
    slug: "stop-phone-quotes-courier-business",
    title: "Why Phone Quotes Are Killing Your Courier Business (And What to Do Instead)",
    description: "Every quote you give over the phone is an hour of your time and a lead you might lose. Here's how to replace phone quotes with automated online pricing.",
    date: "2026-04-03",
    readTime: "5 min read",
    category: "Operations",
    content: `
<p>Phone quotes feel like good customer service. You're talking to the customer, understanding their needs, building a relationship. But when you do the math, phone quotes are one of the most expensive things in your business — and they're costing you customers you don't even know you're losing.</p>

<h2>The hidden cost of phone quotes</h2>

<p>Here's what a phone quote actually costs you:</p>

<ul>
<li><strong>Your time.</strong> A phone quote takes 3-7 minutes, accounting for the call, the math, and any back-and-forth. At 15 quote calls per day, that's over an hour — every day — spent on pricing conversations instead of operations.</li>
<li><strong>Availability cost.</strong> Your phone has to be answered during business hours. That means you or someone on your team is tied to call availability. Miss a call, miss a lead.</li>
<li><strong>Invisible attrition.</strong> Customers who land on your website after hours, on weekends, or who simply don't want to call — you never know they existed. They looked at your site, saw no price, and left. No data, no record, no chance to win the business.</li>
</ul>

<h2>What customers actually prefer</h2>

<p>Customers in 2026 increasingly prefer to get prices online without having to talk to someone first. This isn't unique to courier services — it's true across service businesses. The research is consistent: given the option between calling for a quote and getting one instantly online, a significant majority choose the online option.</p>

<p>This doesn't mean they don't want human contact — it means they want pricing information before they commit to a conversation. Give them the price upfront, and the calls you do get are from customers who are already sold and just want to confirm details or discuss a specific situation.</p>

<h2>What to replace phone quotes with</h2>

<p>An automated quote widget on your website handles everything a phone quote does, without the time cost:</p>

<ul>
<li>Customer enters pickup and drop-off location</li>
<li>System calculates distance and applies your pricing rules</li>
<li>Customer gets an instant estimate and submits their contact info</li>
<li>You get a notification with all the job details</li>
</ul>

<p>You still follow up — but now you're calling customers who already know your price and have expressed interest, not doing math on the phone for someone who might not convert.</p>

<h2>How to transition away from phone quotes</h2>

<ol>
<li><strong>Install a quote widget on your website.</strong> This captures the majority of requests that currently come in by phone.</li>
<li><strong>Update your Google Business Profile.</strong> Add your website link prominently so searchers go there first instead of calling.</li>
<li><strong>Add a message to your voicemail.</strong> "For a quick quote, visit [website]. For anything else, leave a message." Route standard requests online while still being available for complex jobs.</li>
<li><strong>Set up email notifications.</strong> So every new online quote request lands in your inbox immediately — you won't miss anything that would have come in by phone.</li>
</ol>

<p>Most courier businesses that make this shift find they spend less time on quoting, convert more leads (because customers who would have bounced now submit requests), and actually improve the customer experience — because instant answers beat waiting for a callback every time.</p>

<p><a href="/register">Replace your phone quotes with automated online pricing — free with Qalt for 14 days.</a></p>
    `.trim(),
  },
  {
    slug: "how-to-price-delivery-services",
    title: "How to Price Delivery Services: A Practical Guide for Courier Businesses",
    description: "Pricing delivery services is more than rate per mile. Here's how to build a pricing structure that covers your costs, stays competitive, and scales with your business.",
    date: "2026-04-05",
    readTime: "8 min read",
    category: "Operations",
    content: `
<p>Pricing is one of the most consequential decisions in a courier business — and one of the least discussed. Most operators price based on gut feel, what competitors charge, or what they were doing when they started. That leads to jobs that don't cover costs, inconsistent quotes, and money left on the table.</p>

<p>Here's a framework for building delivery pricing that actually works.</p>

<h2>Start with your cost floor</h2>

<p>Before you can price profitably, you need to know what a job actually costs you. The main variables:</p>

<ul>
<li><strong>Fuel cost per mile.</strong> Your vehicle's MPG and local fuel prices give you a per-mile fuel cost. If you're getting 20 MPG and fuel is $3.50/gallon, that's $0.175/mile just in fuel.</li>
<li><strong>Vehicle depreciation and maintenance.</strong> Commercial vehicles depreciate fast. A rough rule: add $0.15-0.25/mile to account for wear, maintenance, and eventual replacement.</li>
<li><strong>Driver time.</strong> What's your effective hourly rate when you account for driving, loading/unloading, and administrative time? A job that takes 90 minutes at your target rate of $30/hour costs you $45 in labor before expenses.</li>
<li><strong>Insurance and overhead.</strong> Commercial auto insurance, business insurance, software, and other fixed costs need to be spread across your job volume.</li>
</ul>

<p>Add these up and you have your cost floor — the minimum you need to charge to break even on any given job. Everything above that is margin.</p>

<h2>Structure your pricing</h2>

<p>Most effective courier pricing has three components:</p>

<h3>Base rate per mile</h3>
<p>A per-mile rate that covers fuel, vehicle costs, and driver time for the driving portion of the job. For local courier work, this typically ranges from $1.50 to $3.50/mile depending on market, vehicle type, and service level. Calculate yours based on your actual costs plus target margin.</p>

<h3>Minimum charge</h3>
<p>Jobs under a few miles don't generate enough revenue at per-mile rates to justify the time involved. A minimum charge (commonly $25-50 depending on market) ensures short local runs are still worth doing. Set this based on the minimum time you'd spend on any job, priced at your effective hourly rate.</p>

<h3>Surcharges for extras</h3>
<p>Additional services or conditions that add real cost to a job should have corresponding fees:</p>
<ul>
<li>After-hours or weekend delivery</li>
<li>Stairs or elevator-required delivery</li>
<li>Inside delivery (vs. curbside)</li>
<li>Oversized or heavy items</li>
<li>Rush/priority service</li>
<li>Signature required or chain of custody documentation</li>
</ul>

<p>Each of these adds time or complexity. Price them accordingly rather than absorbing the cost into your base rate.</p>

<h2>Stay competitive without racing to the bottom</h2>

<p>Knowing what competitors charge is useful context, but pricing to beat the lowest competitor is a race you don't want to win. Instead:</p>

<ul>
<li>Know your market rate range (low, mid, premium)</li>
<li>Position based on your actual strengths (reliability, specialization, relationships)</li>
<li>Price to your target customers — not everyone, just the ones you want to serve</li>
</ul>

<p>Premium clients — law firms, healthcare providers, financial institutions — often prefer to pay more for reliability and accountability than to find the cheapest option. Compete on value in those segments, not price.</p>

<h2>Make your pricing easy to understand</h2>

<p>Complex pricing creates friction. If customers can't quickly understand what they'll pay, they hesitate or don't book. The solution: an online quote tool that applies your pricing rules automatically and gives customers an instant estimate without requiring them to understand the formula.</p>

<p>This also eliminates inconsistency — every customer gets the same price for the same job, which builds trust and reduces negotiation.</p>

<p><a href="/register">Set up your pricing structure in Qalt and automate your quotes — free for 14 days.</a></p>
    `.trim(),
  },
  {
    slug: "capture-leads-courier-website",
    title: "The Best Way to Capture Leads on a Courier Company Website",
    description: "Most courier websites are brochures, not lead machines. Here's how to turn yours into a system that generates and captures customer leads around the clock.",
    date: "2026-04-08",
    readTime: "6 min read",
    category: "Growth",
    content: `
<p>A courier company website that just lists your services and phone number isn't doing enough work. Every visitor who lands on that site is a potential customer — but without a mechanism to capture their information and intent, most of them leave and never come back.</p>

<p>Here's how to turn your website from a digital business card into a lead generation machine.</p>

<h2>Understand the conversion moment</h2>

<p>Website visitors convert when they take an action that puts them in your pipeline. For a courier business, the primary conversion moment is a quote request. That's when a customer moves from "browsing" to "interested in booking."</p>

<p>Everything on your website should be designed to move visitors toward that moment — or capture their information at that moment. If you're not creating friction-free paths to a quote request, you're leaving conversions on the table.</p>

<h2>The highest-converting lead capture: instant quote widget</h2>

<p>The single most effective lead capture tool for courier websites is an embedded instant quote widget. Here's why it converts better than contact forms and call-to-action buttons:</p>

<ul>
<li><strong>It gives before it asks.</strong> The customer gets value (an instant price) before you ask for their contact info. That exchange feels fair and increases completion rates.</li>
<li><strong>It qualifies leads automatically.</strong> A customer who gets a quote and submits a request already knows your price and has indicated interest. That's a warm lead, not a cold contact form submission.</li>
<li><strong>It captures rich data.</strong> You get name, email, phone, pickup location, drop-off location, service type, and estimated price — everything you need to follow up intelligently.</li>
<li><strong>It works 24/7.</strong> No phone availability required. A customer at midnight on a Sunday can get a quote and submit a request that will be in your dashboard Monday morning.</li>
</ul>

<h2>Supporting lead capture elements</h2>

<p>The quote widget is your primary lead capture mechanism. These support it:</p>

<h3>Clear CTAs throughout the page</h3>
<p>Don't make visitors hunt for the quote tool. Add "Get an Instant Quote" buttons in your hero section, at the bottom of your features section, and after testimonials. Each click should jump to or open the quote widget.</p>

<h3>Contact form for non-standard requests</h3>
<p>Some customers have jobs that don't fit a standard quote — ongoing contracts, unusual cargo, bulk volume. A simple contact form captures these leads so they don't bounce when the quote widget doesn't fully address their situation.</p>

<h3>Phone number for high-intent callers</h3>
<p>Some customers, especially older business owners, still prefer to call. Make your number visible. The key is not relying on it as your primary lead capture — it's a backup for customers who won't use the online tool.</p>

<h2>The follow-up system</h2>

<p>Lead capture is only as valuable as your follow-up. When a quote request comes in, you should:</p>

<ol>
<li>Get notified immediately (email notification from your quote tool)</li>
<li>Respond within a few hours, ideally sooner — speed to lead is the biggest factor in conversion rate</li>
<li>Confirm the estimated price or adjust it if the job has specifics the widget didn't capture</li>
<li>Make it easy to book — give the customer clear next steps</li>
</ol>

<p>The combination of fast lead capture (the widget) and fast follow-up (email notifications + quick response) is what turns website traffic into paying customers.</p>

<h2>Measure what's working</h2>

<p>Once you have a lead capture system in place, track it. How many quote requests are you getting per week? What's your close rate on those requests? Which ones convert and which don't? This data tells you where to improve — whether that's the volume of traffic, the conversion rate on your site, or your follow-up process.</p>

<p>Start with the quote widget. Everything else builds on top of it. <a href="/register">Add one to your site with Qalt — free for 14 days.</a></p>
    `.trim(),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
