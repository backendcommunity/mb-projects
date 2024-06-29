<template>
  <div>
    <div class="px-10 pt-20 md:pt-40"></div>

    <section class="bg-white mb-20 max-w-7xl mx-auto px-5">
      <h1 class="text-4xl text-primary text-center font-bold">
        Build FinPay: A FinTech Solution
      </h1>
      <div class="lg:grid grid-cols-7 my-10 flex flex-col gap-10">
        <div class="col-span-5 p-">
          <article
            data-v-3d56a840=""
            data-clarity-region="article"
            class="w-full h-full"
          >
            <h2>What is Rust?</h2>
            <p>
              Rust is a modern systems programming language created in 2006 and
              published in 2015 by Graydon Hoare, a software developer at
              Mozilla Research, as a personal project. It is a systems
              programming language focusing on performance, memory safety, and
              safe concurrency. Developers largely see it as a replacement for
              the mature C and C++, languages as old as they are powerful.
            </p>
            <h2>Key features of Rust</h2>
            <p>
              Rust is a modern systems programming language focusing on safety,
              performance, and concurrency. It was designed to address common
              programming pitfalls and challenges, particularly in systems-level
              programming. Here are some key features that make Rust stand out:
            </p>

            <ol>
              <li>
                <strong>Memory Safety without Garbage Collection:</strong>
                Rust introduces a unique ownership system that enforces strict
                rules about accessing and managing memory. This prevents common
                bugs like null pointer dereferences, dangling pointers, and data
                races without needing a garbage collector.
              </li>
              <li>
                <strong>Ownership, Borrowing, and Lifetimes:</strong> Rust's
                ownership system ensures that memory is managed efficiently and
                safely. Variables have ownership of their data, and the concept
                of borrowing allows functions to temporarily use data without
                taking ownership. Lifetimes ensure that references remain valid
                and prevent dangling references.
              </li>
              <li>
                <strong>Zero-Cost Abstractions:</strong> Rust allows high-level
                programming constructs and abstractions without sacrificing
                performance. Its "zero-cost abstractions" philosophy means that
                the abstractions used at the high level compile into efficient
                machine code with minimal overhead.
              </li>
              <li>
                <strong>Concurrency and Parallelism:</strong> Rust's ownership
                and borrowing model also enables safe concurrency and
                parallelism. The <code>Send</code> and <code>Sync</code> traits
                ensure that data can be safely transferred between threads and
                shared between threads. The <code>async/await</code> syntax
                simplifies asynchronous programming.
              </li>
              <li>
                <strong>Trait System and Pattern Matching:</strong> Rust's trait
                system provides a powerful mechanism for defining shared
                behavior across different types. Pattern matching allows for
                concise and readable code when working with complex data
                structures.
              </li>
              <li>
                <strong>Pattern Matching:</strong> Rust's pattern matching is
                expressive and powerful, enabling concise code for complex data
                manipulation and control flow. It helps in handling different
                cases and scenarios efficiently.
              </li>
              <li>
                <strong>Functional and Imperative Paradigms:</strong> Rust
                supports both functional and imperative programming styles. It
                allows you to choose the paradigm that best fits your problem
                while enforcing safety and performance guarantees.
              </li>
              <li>
                <strong>Crates and Package Management:</strong> Rust has a
                robust package management system with Cargo, simplifying project
                setup, dependency management, and building. Crates are Rust's
                version of libraries, which can be easily shared and
                distributed.
              </li>
              <li>
                <strong>No Null or Undefined Behavior:</strong> Rust eliminates
                null pointer dereferences and undefined behavior by enforcing
                strict rules for memory access. The <code>Option</code> and
                <code>Result</code> types are used to safely handle the absence
                of values and errors.
              </li>
              <li>
                <strong>Cross-Platform Compatibility:</strong> Rust's focus on
                portability and well-defined behavior makes it suitable for
                building cross-platform applications. It supports various
                operating systems and architectures.
              </li>
              <li>
                <strong>Ecosystem and Community:</strong> Rust has a rapidly
                growing and supportive community. The Rust ecosystem includes
                various libraries and tools covering various domains, from web
                development to embedded systems.
              </li>
              <li>
                <strong>Compiled Language:</strong> Rust is a compiled language,
                resulting in efficient and performant binaries. Its compile-time
                checks catch many errors before runtime, reducing the likelihood
                of bugs in production code.
              </li>
            </ol>
            <p>
              These features collectively make Rust a strong choice for systems
              programming, embedded development, web services, and other
              applications where safety, performance, and concurrency are
              crucial.
            </p>
            <h2>Setting up Rust development environment</h2>
            <p>
              The Rust development environment is pretty easy to set up. The
              best way to install Rust is via Rust’s toolchain manager called
              <code>rustup</code>, available at
              <a
                rel="noopener noreferrer"
                href="https://rustup.rs"
                target="_blank"
                >https://rustup.rs</a
              >. They laid down instructions on installing Rust there for your
              operating system.
            </p>
            <p>
              <strong>Note:</strong> The Rust community has put up a set of
              <a
                rel="noopener noreferrer"
                href="https://www.rust-lang.org/governance"
                target="_blank"
                >teams</a
              >
              and standards for managing Rust. One such standard is that all
              Rust-related websites use the <code>.rs</code> domain extension.
            </p>
            <p>The installation you just did came with the following tools:</p>
            <ul>
              <li><code>cargo</code>: the Rust package manager.</li>
              <li>
                <code>rustc: </code>The Rust compiler is sometimes invoked by
                cargo since your code is also treated as a package.
              </li>
              <li>
                <code>rustdoc</code>: the Rust documentation tool for
                documenting comments in Rust code.
              </li>
            </ul>
            <p>
              To check the version of these tools installed, run each of them
              with the
              <code>--version</code> flag:
            </p>
            <pre
              spellcheck="false"
              class="ql-syntax"
            ><code class="language-bash">rustc --version
cargo --version
rustdoc --version
</code></pre>
            <p>
              <img
                width="615"
                height="106"
                alt="Untitled (19).png"
                src="https://strapi-images-aws-s3.s3.us-west-2.amazonaws.com/Untitled_19_1d7cf389c0.png"
              />
            </p>
            <p>
              Let’s get familiar with each of these, starting with
              <code>rustc</code>.
            </p>
            <h2>Project Setup</h2>
            <p>
              Create a new project directory and create a file in it called
              <code>hello.rs</code>. In it, input this simple Hello World
              script:
            </p>
            <pre
              spellcheck="false"
              class="ql-syntax"
            ><code class="language-rust">
fn main() {
	println!("Hello World!");
}
</code>
</pre>
            <div
              class="monacoeditor"
              id="e1d90baa-55ee-4976-a5b0-a6f140f5d2bf"
            ></div>
            <p>Now, run this command from the project directory:</p>
            <pre
              spellcheck="false"
              class="ql-syntax"
            > <code class="language-bash">
rustc hello.rs
</code>
</pre>
            <p>
              If you use <code>ls</code> command to check the content of the
              project directory, you should see a new file named
              <code>hello</code>. Run it like a bash script:
            </p>
            <pre
              spellcheck="false"
              class="ql-syntax"
            ><code class="language-bash">
./hello
# Output is:
Hello World!
</code>
</pre>
            <p>
              Great! You just used the Rust compiler to compile a Rust program
              into a binary file.
            </p>
            <p>
              <img
                width="629"
                height="547"
                alt="Untitled (20).png"
                src="https://strapi-images-aws-s3.s3.us-west-2.amazonaws.com/Untitled_20_7be924890e.png"
              />
            </p>
            <p>
              <strong>Note:</strong> The Rust compiler is allegedly one of the
              smartest and most helpful compilers in the history of programming.
              The Rust community has reason to believe that if your code
              compiles without any errors, it is memory safe and almost
              bug-free.
            </p>
            <p>
              Next, let’s see what <code>cargo</code> is. Delete this project
              folder you just created and run the following command:
            </p>
            <pre
              spellcheck="false"
              class="ql-syntax"
            ><code class="language-bash">
cargo new hello
</code>
</pre>
            <p>
              Next, change the directory into the src/ subdirectory and open the
              <code>main.rs</code> file. You should see the content:
            </p>
            <pre
              spellcheck="false"
              class="ql-syntax"
            ><code class="language-rust">
fn main() {
	println!("Hello, world!");
}
</code>
</pre>
            <p>
              <img
                width="654"
                height="245"
                alt="Untitled (18).png"
                src="https://strapi-images-aws-s3.s3.us-west-2.amazonaws.com/Untitled_18_df92213d13.png"
              />
            </p>
            <p>
              Great. You just used the Rust compilation manager to initialize a
              new binary project. Cargo is a very helpful tool that allows you
              to initialize, build, run, test, and release Rust projects and
              leverage existing Rust libraries in your project. There is
              <a
                rel="noopener noreferrer"
                href="https://doc.rust-lang.org/cargo/"
                target="_blank"
                >an entire book</a
              >
              to learn about Cargo, and its possibilities for your perusal.
            </p>
            <p>
              <strong>Note:</strong> One of the greatest strengths promoting the
              adoption and evolution of the Rust programming language is the
              immersive documentation they provide for everything Rust-related.
              The libraries (called crates) available to Rust are available at
              <a
                rel="noopener noreferrer"
                href="http://Crates.io"
                target="_blank"
                >Crates.io</a
              >, the documentation for each crate is available at
              <a rel="noopener noreferrer" href="http://Docs.rs" target="_blank"
                >Docs.rs</a
              >, jobs in the blockchain space are available at
              <a rel="noopener noreferrer" href="http://Rib.rs" target="_blank"
                >Rib.rs</a
              >, and more.
            </p>
            <p>
              Since we have not learned Rust, let’s pass on the
              <code>rustdoc</code> tool.
            </p>
            <p>
              Next, run this command to compile and run the auto-generated
              program with Cargo:
            </p>
            <pre
              spellcheck="false"
              class="ql-syntax"
            ><code class="language-bash">
cargo run
</code>
</pre>
            <p>Great. You now know how to use Cargo to run a Rust program.</p>
            <h2>IDEs and tools</h2>
            <p>
              When writing Rust code, you will need all the help you can get.
              Install the Rust-Analyzer plugin from the extensions marketplace
              if you use Visual Studio Code. If you are a fan of the JetBrains
              ecosystem of IDEs, you should install the Rust plugin for your
              code and turn on the Cargo Check feature at the bottom of the
              window.
            </p>
          </article>
        </div>

        <div class="self-start sticky top-40 col-span-2 md:w-full">
          <div class="h-full w-full shadow p-5">
            <div class="w-full bg-white mb-5">
              <div class="flex">
                <div
                  class="text-center w-full justify-center flex flex-col gap-3 p-2"
                >
                  <a
                    href="#"
                    target="_blank"
                    class="px-6 py-3 border border-solid w-full bg-secondary text-white font-bold text-lg rounded block"
                  >
                    Download PRD
                  </a>

                  <a
                    href="#"
                    target="_blank"
                    class="px-6 py-3 border border-secondary border-solid w-ful text-secondary font-bold text-lg rounded block"
                  >
                    Preview Frontend
                  </a>
                </div>
              </div>
            </div>

            <div class="w-full bg-white">
              <div class="grid grid-cols-2 w-full gap-5">
                <div class="flex items-center gap-2">
                  <span class="w-6">
                    <img
                      class="star-rating"
                      src="~/assets/img/blue-check.png"
                      alt=""
                    />
                  </span>
                  <div class="flex flex-1 flex-col">
                    <h3 class="text-lg leading-6">Intermediate</h3>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-6">
                    <img
                      class="star-rating"
                      src="~/assets/img/blue-check.png"
                      alt=""
                    />
                  </span>
                  <div class="flex flex-1 flex-col">
                    <h3 class="text-lg leading-6">2 Tasks</h3>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <span class="w-6">
                    <img
                      class="star-rating"
                      src="~/assets/img/blue-check.png"
                      alt=""
                    />
                  </span>
                  <div class="flex flex-1 flex-col">
                    <h3 class="text-lg leading-6">1 Month</h3>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <span class="w-6">
                    <img
                      class="star-rating"
                      src="~/assets/img/blue-check.png"
                      alt=""
                    />
                  </span>
                  <div
                    class="flex flex-1 overflow-x-scroll no-scrollbar flex-col"
                  >
                    <h3 class="text-lg leading-6 w-full">Fintech</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full my-5 bg-white shadow p-5">
            <h4 class="text-2xl text-bold mb-5">Tags</h4>
            <div class="grid grid-cols-2 w-full gap-5">
              <div class="flex items-center gap-2">
                <span class="w-6">
                  <img
                    class="star-rating"
                    src="~/assets/img/blue-check.png"
                    alt=""
                  />
                </span>
                <div class="flex flex-1 flex-col">
                  <h3 class="text-lg leading-6">Node.js</h3>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-6">
                  <img
                    class="star-rating"
                    src="~/assets/img/blue-check.png"
                    alt=""
                  />
                </span>
                <div class="flex flex-1 flex-col">
                  <h3 class="text-lg leading-6">Express</h3>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <span class="w-6">
                  <img
                    class="star-rating"
                    src="~/assets/img/blue-check.png"
                    alt=""
                  />
                </span>
                <div class="flex flex-1 flex-col">
                  <h3 class="text-lg leading-6">Open Banking API</h3>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <span class="w-6">
                  <img
                    class="star-rating"
                    src="~/assets/img/blue-check.png"
                    alt=""
                  />
                </span>
                <div
                  class="flex flex-1 overflow-x-scroll no-scrollbar flex-col"
                >
                  <h3 class="text-lg leading-6 w-full">Mono API</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full my-5 bg-white shadow p-5">
            <div class="mb-5">
              <h4 class="text-2xl text-bold mb-5">Want Your Certificate?</h4>
              <p>
                Complete all the tasks in the project to claim your certificate
              </p>
            </div>
            <!-- Certificate Sample here -->
            <button
              disabled="true"
              class="px-6 py-3 border border-solid w-full bg-gray-500 text-gray-300 font-bold text-lg rounded block"
            >
              {{ "Claim Your Certificate" }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
  <script setup>
</script>
  
  <style scoped>
article img {
  height: auto;
  width: 100%;
  background-size: cover;
}

article table {
  border: 1px solid #eee;
}

article > * {
  font-family: "Georgia", serif !important;
}

article p,
article {
  margin-bottom: 1.3rem;
  font-weight: 400;
  line-height: 2;
}

article h1,
article h2,
article h3,
article h4,
article h5,
article h6 {
  padding-bottom: 0.8rem;
  padding-top: 0.8rem;
  font-weight: bold;
}

article h2 {
  font-size: 1.6rem;
}

article h3 {
  font-size: 1.4rem;
}

article h4 {
  font-size: 1.2rem;
}

article h5 {
  font-size: 1rem;
}

article h6 {
  font-size: 0.8rem;
}

article > ul {
  list-style: disc !important;
}

article > ol {
  list-style: decimal !important;
}
article ul,
article ol {
  margin-bottom: 1.3rem;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
}

article ul li,
article ol li {
  line-height: 32px;
  font-size: 1.125rem;
  font-weight: 400;
}

article figure figcaption {
  line-height: 32px;
  text-align: center;
  font-style: italic;
  font-weight: 400;
}

article figure img {
  outline: none !important;
  margin: 0 auto !important;
  border: 5px solid #cccccc;
  display: inline-block;
  width: 10%;
  height: auto;
  border-radius: 0 !important;
}

article a,
article a:hover {
  color: #191488;
  transition: all 0.2s ease-in-out 0s;
  background-color: transparent;
}
</style>