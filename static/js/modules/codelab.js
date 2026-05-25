// Code Lab — Interactive Code Learning Environment

var currentClTab = 'guides';
var currentClLang = 'python';
var _clAbortController = null;

var CODEGUIDES = [
  {
    id:'python-intro',
    title:'Python Basics',
    category:'Python',
    steps: [
      {title:'Welcome to Python!',text:'Hey there! Python is a programming language that reads almost like English. It\'s used for websites, AI, rocket science — but right now, we\'re starting simple: writing code that actually runs. Don\'t just read — type every example in the code editor on the right. Change things. Break things. That\'s how you learn.',code:'print("Hello, World!")',try:'Change the message to include your name: print("Hello, Alex!")',solution:'print("Hello, Alex!")'},
      {title:'Leave Yourself Notes',text:'Use # to write comments. Comments are notes Python ignores — they\'re for humans (including future you). Good programmers comment their code so they remember what it does months later.',code:'# This is a comment — Python ignores this line\nprint("Hello!")  # Comments can go after code too',try:'Add a comment above your Hello World explaining what it does',solution:'# Print a greeting\nprint("Hello, Alex!")'},
      {title:'Python is a Calculator',text:'Python does math faster than any calculator. Try addition (+), subtraction (-), multiplication (*), division (/), floor division (//), modulus (%), and exponents (**).',code:'print(2 + 3)    # 5\nprint(10 - 4)   # 6\nprint(3 * 7)    # 21\nprint(15 / 4)   # 3.75\nprint(15 // 4)  # 3 (floor)\nprint(15 % 4)   # 3 (remainder)\nprint(2 ** 3)   # 8 (power)',try:'Calculate how many seconds are in a day: 24 * 60 * 60. Print the result.',solution:'seconds = 24 * 60 * 60\nprint("Seconds in a day:", seconds)'},
      {title:'Need Help?',text:'Stuck? Python has built-in help. Type help(print) to see what print() can do. You can also try dir(str) to list all methods for strings. Python\'s documentation is always one command away.',code:'help(print)\n# Try: dir(str)',try:'Use help(print) to see what the print function can do. Find one parameter you didn\'t know about!',solution:'help(print)  # Shows all the things print() can do'}
    ],
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Welcome to Python! Let\\\'s Write Some Code!</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Hey there! Welcome to Python — a programming language that reads almost like English. Created by Guido van Rossum in 1991, Python is designed to be <em>fun</em> to write and easy to read. It\\\'s used for everything from websites to AI to rocket science. But right now, we\\\'re going to start simple: writing code that actually runs.</p>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Here\\\'s the deal: don\\\'t just read this guide. Type the examples in the code runner below. Change them. Break them. That\\\'s how you actually learn. Ready? Let\\\'s go!</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Your First Program (It\\\'s a Tradition)</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Every programmer starts here. Type this and hit run:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">print("Hello, World!")</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Boom! You\\\'re officially a programmer. <code>print()</code> shows text on screen. Try changing the message to your name. Go ahead, I\\\'ll wait.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Leave Yourself Notes (Comments)</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Use <code>#</code> to write comments that Python ignores completely. Your future self will thank you when you revisit this code in 6 months:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># This is a comment — Python ignores this line\\nprint("Hello!")  # You can also put comments after code</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Common pitfall:</strong> Forgetting the <code>#</code>! Without it, Python tries to run your comment as code and crashes with a SyntaxError. Always start comments with <code>#</code>.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Python is a Fancy Calculator</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python can do math. And it\\\'s way better than a real calculator. Try these:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">print(2 + 3)   # Addition: 5\\nprint(10 - 4)  # Subtraction: 6\\nprint(3 * 7)   # Multiplication: 21\\nprint(15 / 4)  # Division: 3.75\\nprint(15 // 4) # Floor division (chops decimal): 3\\nprint(15 % 4)  # Modulus (remainder): 3\\nprint(2 ** 3)  # Exponent (power): 8</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Watch out!</strong> <code>/</code> always gives a decimal (float). If you want a whole number, use <code>//</code>. Try <code>print(10 / 3)</code> vs <code>print(10 // 3)</code> to see the difference!</p>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> Use parentheses to control order: <code>(2 + 3) * 4</code> = 20, but <code>2 + 3 * 4</code> = 14. Without parens, Python follows PEMDAS (multiplication before addition).</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Need Help? Python Has Your Back</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Stuck? Type <code>help(print)</code> or <code>dir(str)</code> to see what something can do. Python\\\'s built-in help is like having a super-nerdy friend on speed dial:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">help(print)\\ndir(str)</code></pre>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Print "Python is awesome!" instead of "Hello, World!"</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Calculate how many seconds are in a day (24 * 60 * 60) and print it</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Add a comment explaining what your code does (use <code>#</code>)</p>'
      + '</div>'
  },
  {
    id:'python-vars',
    title:'Variables & Types',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Variables: Sticky Notes for Your Code</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Imagine labeling jars in your kitchen. One says \"sugar\", another says \"flour\". That\\\'s what variables are — named containers for values. In Python, you just write <code>name = value</code> and done. No extra ceremony, no type declarations. Python figures out the type from what you put in it.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">name = "Alice"\\nage = 25\\nheight = 5.6\\nis_student = True</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Naming Rules (Python Plays by Rules)</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Names must start with a letter or underscore, then can have letters, numbers, or underscores. They\\\'re case-sensitive (<code>age</code> vs <code>Age</code> = totally different). And NEVER use Python keywords like <code>if</code>, <code>class</code>, or <code>return</code> — Python will yell at you:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">valid_name = "ok"\\n_validName = "also ok"\\nname123 = "fine"\\n# 123name = "not allowed"  # SyntaxError — numbers can\\\'t start!</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Common mistake:</strong> Starting a name with a number! <code>1st_place</code> is illegal. Python thinks it\\\'s a number followed by random stuff. Use <code>first_place</code> instead.</p>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Another gotcha:</strong> <code>if = 5</code> will give a SyntaxError because <code>if</code> is a reserved keyword. Python won\\\'t even let you try — it\\\'ll stop you instantly.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">The Python Type Zoo</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python has several built-in types. Think of them as different flavors of data:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">x = 42          # int — whole numbers\\ny = 3.14        # float — decimals\\nz = "Hello"     # str — text\\nflag = False    # bool — True or False\\nnothing = None  # NoneType — "nothing here, move along"\\n\\nprint(type(x))  # <class \\\'int\\\'>  — use type() to check!</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> <code>type()</code> is your debugging best friend. Stuck on a weird error? Print <code>type(your_variable)</code> and see what Python thinks it is. You\\\'ll spot the problem immediately.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Type Conversion: Shape-Shifting Data</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Sometimes you need to convert between types. <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code> are your conversion spells. But be careful — not everything converts:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">age_str = "25"\\nage_int = int(age_str)      # "25" -> 25\\npi = 3.14159\\npi_str = str(pi)            # 3.14159 -> "3.14159"\\nnum = float("10.5")        # "10.5" -> 10.5\\nprint(bool(0))             # 0 -> False\\nprint(bool(""))            # "" -> False\\nprint(bool("hello"))       # "hello" -> True</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Watch out!</strong> <code>int("hello")</code> crashes with <code>ValueError</code>. Python can\\\'t magically turn letters into numbers (it\\\'s programming, not wizardry). Always convert from types that actually make sense.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Party Trick: Multi-Assignment</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python lets you assign multiple variables at once. Even swap two values WITHOUT a temporary variable. Show this to a friend who uses another language — watch their jaw drop:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">a, b, c = 1, 2, 3\\n# Swap without a temp! Mind-blowing!\\na, b = b, a  # a=2, b=1</code></pre>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Create a variable <code>my_age</code> with your age and print it</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Convert the string "7.5" to a float, double it, and print the result</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Swap <code>a = 10</code> and <code>b = 20</code> using Python\\\'s magic swap trick</p>'
      + '</div>'
  },
  {
    id:'python-strings',
    title:'Strings & Formatting',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Strings: Python\\\'s Way With Words</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Strings are just text. A single character, a word, a sentence, a whole book — if it\\\'s made of letters and symbols, it\\\'s a string. In Python, you wrap them in single (<code>\\\'hi\\\'</code>) or double (<code>"hi"</code>) quotes. Python doesn\\\'t care which, just pick one and be consistent. Triple quotes are for multi-line strings.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">s1 = \\\'Hello\\\'\\ns2 = "World"\\ns3 = \\\'\\\'\\\'This can be\\nmultiple lines\\nwithout any extra effort!\\\'\\\'\\\'</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">String Superpowers</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">You can glue strings with <code>+</code> (concatenation) or multiply them with <code>*</code>. Yes, <code>"ha" * 3</code> gives <code>"hahaha"</code>. Try doing THAT in a calculator:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">greeting = "Hello" + " " + "World"  # "Hello World"\\nha = "ha" * 3                       # "hahaha"\\nprint("ell" in "Hello")            # True — substring check!</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> <code>in</code> is amazing for checking if one string contains another. Use it for searching, filtering, and validation.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Slicing: Carve Out Any Piece</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Think of a string as a row of numbered boxes, starting at 0 (computer scientists have strong opinions about counting). Slicing <code>[start:stop:step]</code> lets you extract any portion. The stop index is <em>excluded</em> (sorry, it\\\'s just how it works):</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">text = "Python"\\nprint(text[0])   # P — first character\\nprint(text[-1])  # n — last character\\nprint(text[0:3]) # Pyt — indices 0,1,2 (3 is excluded!)\\nprint(text[::-1])# nohtyP — reversed! How cool is that?</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Off-by-one trap!</strong> Remember <code>[start:stop]</code> excludes <code>stop</code>. So <code>"Python"[0:5]</code> gives "Pytho", not the full word. Use <code>[:6]</code> or just <code>[:]</code> to get everything.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Handy String Methods</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7"><code>.upper()</code> for SHOUTING, <code>.lower()</code> for whispering, <code>.strip()</code> trims whitespace, <code>.split()</code> breaks into a list, <code>.join()</code> glues a list back together, <code>.replace()</code> swaps text:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">s = "  Hello, World!  "\\nprint(s.strip())          # "Hello, World!" — no more spaces\\nprint(s.upper())          # "  HELLO, WORLD!  "\\nparts = ["a", "b", "c"]\\nprint("-".join(parts))    # "a-b-c"\\nprint(s.replace("World", "Python"))  # swap text</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Strings are IMMUTABLE!</strong> <code>.upper()</code> returns a NEW string, it doesn\\\'t change the original. <code>s.upper()</code> without reassignment does nothing you can see. You need <code>s = s.upper()</code> to save the change.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">F-Strings: The Modern Way</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">F-strings (Python 3.6+) are the best thing since sliced strings. Prefix with <code>f</code>, use <code>{}</code> to drop variables right in. Clean, readable, beautiful:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">name = "Alice"\\nage = 25\\nprint(f"My name is {name} and I am {age} years old.")\\nprint(f"Next year: {age + 1}. Getting old, eh?")\\nprint(f"Pi: {3.14159:.3f}")  # "3.142" — format specifiers!</code></pre>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Create a variable with your name and print "Hello, [name]!" using an f-string</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Use <code>.replace()</code> to change "cats are great" to "dogs are great"</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Reverse the string "desserts" using <code>[::-1]</code> — what do you get?</p>'
      + '</div>'
  },
  {
    id:'python-lists',
    title:'Lists & Loops',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Lists: Your Code\\\'s Shopping Cart</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">A list is like a shopping cart — you toss stuff in, take stuff out, and everything stays in order. Lists are <strong>ordered</strong>, <strong>mutable</strong> (changeable), and can hold ANY type. Create one with square brackets <code>[]</code>:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">fruits = ["apple", "banana", "cherry"]\\nmixed = [1, "hello", 3.14, True]  # Lists don\\\'t care about types\\nempty = []\\nnested = [[1, 2], [3, 4]]  # Lists inside lists!</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Indexing: Zero is the First</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Like strings, list indexing starts at 0 (blame computer scientists). Use negative indices to count from the end. And you can change items by assigning to an index — try THAT with a string:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">fruits = ["apple", "banana", "cherry", "date"]\\nprint(fruits[0])     # apple\\nprint(fruits[-1])    # date\\nprint(fruits[1:3])   # ["banana", "cherry"]\\nfruits[0] = "avocado"  # Lists are mutable!</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Common crash:</strong> <code>IndexError</code> happens when you try <code>fruits[100]</code>. Always check <code>len(fruits)</code> first. Or use a loop and let Python handle the bounds.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">List Superpowers (a.k.a. Methods)</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7"><code>.append()</code> adds to end, <code>.insert()</code> at a position, <code>.remove()</code> by value, <code>.pop()</code> removes and returns, <code>.sort()</code> orders in place:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">nums = [3, 1, 4, 1, 5]\\nnums.append(9)          # [3, 1, 4, 1, 5, 9]\\nnums.insert(0, 0)       # [0, 3, 1, 4, 1, 5, 9]\\nnums.remove(1)          # removes first 1\\nlast = nums.pop()       # removes and returns 9\\nnums.sort()             # [0, 1, 3, 4, 5]</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Sneaky trap:</strong> <code>.sort()</code> returns <code>None</code> — it modifies the list in place! Don\\\'t write <code>sorted_list = my_list.sort()</code>. Use <code>sorted(my_list)</code> if you want a new list.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">For Loops: Visit Every Item</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">A <code>for</code> loop walks through each item in a list automatically. It\\\'s like an assembly line — each element gets processed in turn. No manual indexing needed!</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">fruits = ["apple", "banana", "cherry"]\\nfor fruit in fruits:\\n    print(f"I love {fruit}")\\n\\n# range() generates numbers\\nfor i in range(5):\\n    print(i)  # 0, 1, 2, 3, 4</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> Need both index AND value? Use <code>enumerate()</code>: <code>for i, fruit in enumerate(fruits):</code>. Much cleaner than <code>range(len(fruits))</code>.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">List Comprehensions: One-Line Magic</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Want to create a list from another list in a single line? List comprehensions are basically a for loop compacted into an expression. They\\\'re Pythonic, elegant, and make you look like a pro:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">squares = [x**2 for x in range(10)]      # [0, 1, 4, 9, ...]\\nevens = [x for x in range(20) if x % 2 == 0]  # only evens</code></pre>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Create a list of 3 favorite movies, then loop through and print each one with <code>enumerate()</code></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Use a list comprehension to get even numbers from 0 to 20</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Append "durian" to your fruit list, sort it — what order does Python use?</p>'
      + '</div>'
  },
  {
    id:'python-dicts',
    title:'Dictionaries & Sets',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Dictionaries: Like a Phonebook for Your Code</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">A list is great for ordered items, but what if you want to look things up by NAME, not by number? Enter the <strong>dictionary</strong> — a collection of key-value pairs. Think of it as a phonebook: you look up a name (key) and get a number (value). Keys are usually strings, and they must be unique.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">person = {\\n    "name": "Alice",\\n    "age": 25,\\n    "city": "New York"\\n}\\n\\nprint(person["name"])        # Alice — but crashes if key missing!\\nprint(person.get("age"))     # 25 — .get() is safer\\nprint(person.get("country", "USA"))  # default if missing</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Watch out!</strong> <code>person["country"]</code> on a missing key = <code>KeyError</code> = crash! Use <code>.get()</code> instead. It returns <code>None</code> (or your default) if the key doesn\\\'t exist. Your program will thank you.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Adding, Changing, Deleting</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Dicts are flexible — add or update with assignment, delete with <code>del</code> or <code>.pop()</code>. And always check <code>if key in dict</code> before accessing:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">person["email"] = "alice@example.com"  # add new key\\nperson["age"] = 26                      # update value\\ndel person["city"]                      # delete key\\npopped = person.pop("name")             # remove and return value\\n\\n# Safe check before access\\nif "email" in person:\\n    print(person["email"])</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Looping Through a Dict</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7"><code>.keys()</code> gives keys, <code>.values()</code> gives values, <code>.items()</code> gives BOTH. <code>.items()</code> is the MVP — use it most of the time:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">for key, value in person.items():\\n    print(f"{key}: {value}")  # clean and readable</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Sets: The Anti-Duplicate Squad</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">A <strong>set</strong> is like a list that hates duplicates. Perfect for \"have I seen this before?\" questions and math operations like union (<code>|</code>) and intersection (<code>&</code>):</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">fruits = {"apple", "banana", "cherry", "apple"}\\nprint(fruits)  # {"apple", "banana", "cherry"} — no dupes!\\n\\na = {1, 2, 3, 4}\\nb = {3, 4, 5, 6}\\nprint(a | b)  # union:        {1,2,3,4,5,6}\\nprint(a & b)  # intersection: {3,4}\\nprint(a - b)  # difference:   {1,2}</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Easy to forget:</strong> <code>{}</code> makes an empty <strong>dictionary</strong>, not a set! For an empty set, use <code>set()</code>. This has tripped up every Python programmer at least once.</p>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> Dicts and sets have super-fast lookups (O(1)). Need to check if something exists? Use a set or dict, not a list. It\\\'s thousands of times faster for large collections.</p>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Create a dict with "title", "author", "year" for your favorite book</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Loop through it with <code>.items()</code> and print each key-value pair</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Take a list of numbers with duplicates, convert to a set — what happens?</p>'
      + '</div>'
  },
  {
    id:'python-funcs',
    title:'Functions & Scope',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Functions: Don\\\'t Repeat Yourself!</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Have you ever copy-pasted the same code five times and thought \"there must be a better way\"? There is. It\\\'s called a <strong>function</strong>. A function is a reusable recipe — write the steps once, give it a name, and call it whenever you need it. It\\\'s the DRY principle: Don\\\'t Repeat Yourself.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">def greet(name):\\n    """Return a friendly greeting."""\\n    return f"Hello, {name}!"\\n\\nmessage = greet("Alice")\\nprint(message)  # Hello, Alice!</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7"><code>def</code> says \"I\\\'m making a function.\" <code>name</code> is a parameter (a placeholder). <code>return</code> sends the result back. Without <code>return</code>, you get <code>None</code> — Python\\\'s way of saying \"I did the thing but there\\\'s nothing to give back.\"</p>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Classic newbie trap:</strong> Forgetting <code>return</code>! If you write <code>def add(a, b): a + b</code> without <code>return</code>, the function calculates the sum and then... throws it into the void. Always <code>return</code> if you want a result!</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Parameters: The Many Flavors</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python functions are flexible. Default parameters let you skip arguments. Keyword arguments let you pass in any order. <code>*args</code> catches extra positional args like a baseball mitt:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Default parameter — if they don\\\'t pass exp, it\\\'s 2\\ndef power(base, exp=2):\\n    return base ** exp\\n\\nprint(power(3))     # 9 (3^2) — uses default\\nprint(power(3, 3))  # 27 (3^3) — overrides default\\n\\n# Keyword arguments — order doesn\\\'t matter!\\nprint(power(exp=4, base=2))  # 16\\n\\n# *args catches any number of arguments\\ndef sum_all(*args):\\n    return sum(args)\\n\\nprint(sum_all(1, 2, 3, 4, 5))  # 15</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Big gotcha:</strong> Don\\\'t use mutable defaults like <code>def f(x=[]):</code>! That list is created ONCE and shared across all calls. Use <code>None</code> and create the list inside: <code>def f(x=None): x = x or []</code>.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Scope: Where Variables Live</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Variables inside a function are <strong>local</strong> — they don\\\'t exist outside. Variables outside are <strong>global</strong>. Python uses the LEGB rule (Local, Enclosing, Global, Built-in) when looking up names. It\\\'s like asking \"is it in this room? this building? this city?\"</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">x = 10  # global — everyone can see it\\n\\ndef outer():\\n    y = 5  # enclosing — inner() can access this\\n    def inner():\\n        z = 1  # local — only inner() knows z\\n        return x + y + z\\n    return inner()\\n\\nprint(outer())  # 16</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> Keep global variables to a minimum. Pass data as parameters instead. Your code will be easier to debug, test, and your future self will send you a thank-you note.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Lambda: The Express Lane</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Need a quick one-line function? <code>lambda</code> is your friend. It\\\'s an anonymous function you can define on the fly. Perfect for simple operations with <code>map()</code> and <code>filter()</code>:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">square = lambda x: x**2\\nprint(square(5))  # 25\\n\\nnums = [1, 2, 3, 4, 5]\\ndoubled = list(map(lambda x: x*2, nums))  # [2,4,6,8,10]\\nevens = list(filter(lambda x: x % 2 == 0, nums))  # [2,4]</code></pre>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Write a function <code>is_even(n)</code> that returns <code>True</code> for even numbers</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Create a function <code>greet(name, greeting="Hello")</code> with a default greeting</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Use a lambda with <code>map()</code> to convert ["apple", "banana"] to ALL CAPS</p>'
      + '</div>'
  },
  {
    id:'python-classes',
    title:'Classes & OOP',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Classes: Cookie Cutters for Your Code</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">A <strong>class</strong> is a blueprint. An <strong>object</strong> is what you make from that blueprint. Think of a class as a cookie cutter (shape = blueprint) and objects as actual cookies. Each cookie can have different sprinkles, but they all share the same shape. This is <strong>Object-Oriented Programming (OOP)</strong> — modeling real-world things as objects with data (attributes) and actions (methods).</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Your First Class</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7"><code>class</code> defines the blueprint. <code>__init__</code> is the constructor (runs when you create an object). <code>self</code> is how the object refers to itself — think of it as saying \"me\" or \"this cookie right here\":</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class Dog:\\n    def __init__(self, name, age):\\n        self.name = name\\n        self.age = age\\n\\n    def bark(self):\\n        return f"{self.name} says Woof!"\\n\\n    def human_years(self):\\n        return self.age * 7\\n\\nbuddy = Dog("Buddy", 3)\\nprint(buddy.bark())              # Buddy says Woof!\\nprint(buddy.human_years())       # 21</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Most common mistake:</strong> Forgetting <code>self</code> as the first parameter of every method! <code>def bark():</code> won\\\'t work — Python will silently pass the object as the first argument and fail. Every method needs <code>self</code> at minimum.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Inheritance: Kids Inheriting Traits</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">A class can inherit from another class, getting all its features for free. Then override the ones you want to customize. It\\\'s like inheriting your parent\\\'s car but adding your own bumper stickers:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class Animal:\\n    def __init__(self, name):\\n        self.name = name\\n    def speak(self):\\n        return "..."\\n\\nclass Cat(Animal):  # Cat inherits from Animal\\n    def speak(self):\\n        return f"{self.name} says Meow!"\\n\\nclass Dog(Animal):\\n    def speak(self):\\n        return f"{self.name} says Woof!"\\n\\npets = [Cat("Whiskers"), Dog("Buddy")]\\nfor p in pets:\\n    print(p.speak())  # Same method name, different behavior!</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> The \"same method, different results\" thing is called <strong>polymorphism</strong>. It\\\'s a fancy word for \"cat and dog both speak() but differently.\" Say it at parties. You\\\'ll sound super smart.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Magic Methods: The __dunder__ Powers</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Methods like <code>__init__</code>, <code>__str__</code>, <code>__len__</code> are \"magic\" or \"dunder\" (double underscore) methods. They let your objects behave like built-in types — printing nicely, supporting <code>len()</code>, etc:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class Book:\\n    def __init__(self, title, author):\\n        self.title = title\\n        self.author = author\\n    def __str__(self):\\n        return f"\\\'{self.title}\\\' by {self.author}"\\n    def __len__(self):\\n        return len(self.title)\\n\\nb = Book("1984", "George Orwell")\\nprint(b)       # \\\'1984\\\' by George Orwell — thanks __str__!\\nprint(len(b))  # 4 — thanks __len__!</code></pre>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Create a <code>Student</code> class with <code>name</code> and <code>grades</code> (a list). Add a method to calculate the average grade.</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Create a <code>Car</code> class that inherits from a <code>Vehicle</code> parent class</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Add <code>__str__</code> to your Student class so <code>print(student)</code> shows a nice summary</p>'
      + '</div>'
  },
  {
    id:'python-files',
    title:'File I/O',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">File I/O: Making Your Data Immortal</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Everything we\\\'ve done so far vanishes when the program ends. Like tears in rain. But with file I/O, your data lives on! Python makes reading and writing files almost boringly simple. The secret weapon: the <code>with</code> statement.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Writing: Save Stuff Forever</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Use <code>open("filename", "w")</code> to write. The <code>with</code> block auto-closes the file — even if your code crashes. No more forgetting <code>.close()</code>! (Raise your hand if you\\\'ve forgotten. Yeah, me too.)</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">with open("hello.txt", "w") as f:\\n    f.write("Hello, World!\\n")\\n    f.write("This data is now IMMORTAL.\\n")\\n# File auto-closes. You\\\'re welcome.</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Warning!</strong> Mode <code>"w"</code> obliterates the file and starts fresh. POOF — gone. If your file had important data, it\\\'s history. Use <code>"a"</code> (append) to add to the end, or <code>"x"</code> to create a new file (safely failing if it exists).</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Reading: Bring Data Back to Life</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Mode <code>"r"</code> reads. You can slurp the whole file with <code>.read()</code> or iterate line by line (great for massive files that would eat your memory):</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Read entire file at once\\nwith open("hello.txt", "r") as f:\\n    content = f.read()\\n\\n# Read line by line (memory-friendly!)\\nwith open("hello.txt", "r") as f:\\n    for line in f:\\n        print(line.strip())  # strip() removes the trailing \\n</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Classic error:</strong> Trying to open a file that doesn\\\'t exist = <code>FileNotFoundError</code>! Always wrap file reading in try/except, or check <code>Path("file.txt").exists()</code> first.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Paths: Where Is That File Anyway?</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Windows uses backslashes, Mac/Linux use forward slashes. Hard-coding paths is a recipe for disaster. Use <code>pathlib.Path</code> — it works everywhere and has smart methods:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">from pathlib import Path\\n\\np = Path("data/subdir/file.txt")\\nprint(p.exists())    # Does it exist?\\nprint(p.suffix)      # .txt\\nprint(p.stem)        # file (no extension)\\nprint(p.parent)      # data/subdir</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> <code>pathlib</code> is the modern way (Python 3.4+). It\\\'s cleaner than <code>os.path.join()</code> and works cross-platform. Use it. Love it.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">JSON: The Universal Data Language</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">JSON is everywhere — web APIs, config files, you name it. Python\\\'s <code>json</code> module can save your dicts/lists directly to a file and load them back. Mind = blown:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">import json\\n\\ndata = {"name": "Alice", "age": 25, "scores": [85, 92, 78]}\\n\\nwith open("data.json", "w") as f:\\n    json.dump(data, f, indent=2)\\n\\nwith open("data.json", "r") as f:\\n    loaded = json.load(f)\\n    print(loaded["name"])  # Alice</code></pre>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Write a program that saves your name and age to a file called "me.txt"</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Read it back and print the contents</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Store your favorite movies as a JSON list and load them back</p>'
      + '</div>'
  },
  {
    id:'python-errors',
    title:'Error Handling',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Error Handling: When Things Go Wrong (And They Will)</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Let\\\'s be real — your code WILL crash. Mine does. Every programmer\\\'s does. The difference between a beginner and a pro isn\\\'t that the pro never makes mistakes; it\\\'s that the pro handles them gracefully. Python uses <strong>exceptions</strong> to deal with errors, and <code>try/except</code> blocks are your safety net.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Try / Except: The Safety Net</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Wrap risky code in <code>try</code>, catch specific errors in <code>except</code>. Python checks each except block in order, so put specific errors first and the general catch-all <code>Exception</code> last:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">try:\\n    num = int(input("Enter a number: "))\\n    result = 10 / num\\n    print(f"Result: {result}")\\nexcept ValueError:\\n    print("That was not a valid number!")\\nexcept ZeroDivisionError:\\n    print("Cannot divide by zero!")\\nexcept Exception as e:\\n    print(f"Something unexpected happened: {e}")</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Common mistake:</strong> Catching <code>Exception</code> too broadly! Only catch specific exceptions you expect. A bare <code>except:</code> hides bugs and makes debugging a nightmare. Be specific — your future self will thank you.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">The Rogues\\\' Gallery of Exceptions</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">You\\\'ll meet these troublemakers often: <code>ValueError</code> (wrong value), <code>TypeError</code> (wrong type), <code>IndexError</code> (list index out of range), <code>KeyError</code> (dict key missing), <code>FileNotFoundError</code> (file MIA), <code>AttributeError</code> (method doesn\\\'t exist), <code>ZeroDivisionError</code> (math says nope):</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">try:\\n    my_list = [1, 2, 3]\\n    print(my_list[10])\\nexcept IndexError:\\n    print("Too far! That index doesn\\\'t exist.")\\n\\ntry:\\n    my_dict = {"a": 1}\\n    print(my_dict["b"])\\nexcept KeyError:\\n    print("Key not found — try .get() next time!")</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Classic gotcha:</strong> Forgetting that <code>ZeroDivisionError</code> is separate from <code>ValueError</code>! When dividing, always handle both, or use an <code>if</code> check before dividing.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Else and Finally: The Cleanup Crew</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7"><code>else</code> runs if NO exception happened. <code>finally</code> ALWAYS runs — even if the program crashes. <code>finally</code> is for cleanup: closing files, releasing resources, saying goodbye:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">try:\\n    f = open("file.txt", "r")\\n    content = f.read()\\nexcept FileNotFoundError:\\n    print("File not found!")\\nelse:\\n    print(f"Read {len(content)} characters — success!") \\nfinally:\\n    f.close()\\n    print("File closed. Always clean up after yourself.")</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> The <code>with</code> statement (like <code>with open(...) as f:</code>) auto-closes files even without <code>finally</code>. But <code>finally</code> is still useful for other cleanup tasks.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Raising Exceptions: You\\\'re the Boss</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Sometimes YOU need to raise an exception. Use <code>raise</code> when someone passes bad data to your function. It\\\'s like saying \"I can\\\'t work with this, fix it and try again\":</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">def divide(a, b):\\n    if b == 0:\\n        raise ValueError("Can\\\'t divide by zero — nice try though!")\\n    return a / b\\n\\ndef set_age(age):\\n    if age < 0 or age > 150:\\n        raise ValueError(f"{age} years old? Really?")</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">You can even create custom exceptions — just inherit from <code>Exception</code>. It\\\'s the classiest way to signal your own error types:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class InsufficientFundsError(Exception):\\n    pass\\n\\ndef withdraw(balance, amount):\\n    if amount > balance:\\n        raise InsufficientFundsError(f"Short by ${amount - balance}")\\n    return balance - amount</code></pre>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Write a try/except that catches a <code>ZeroDivisionError</code> and prints a friendly message</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Create a function <code>get_item(lst, index)</code> that returns the item OR a friendly error if the index is out of range</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Add a <code>finally</code> block to your try/except that prints "Thanks for using this program!"</p>'
      + '</div>'
  },
  {
    id:'python-modules',
    title:'Modules & Imports',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Modules: Standing on the Shoulders of Giants</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Imagine having a toolbox where you only grab the tools you need, when you need them. That\\\'s what modules are in Python. A module is just a <code>.py</code> file with functions, classes, and variables that you can import into other programs. Python comes with a massive standard library — hundreds of pre-built tools so you don\\\'t have to reinvent the wheel.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">The Many Ways to Import</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">There are several import styles. Import the whole module, import specific items, or give them aliases so you don\\\'t have to type as much:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">import math\\nfrom datetime import datetime\\nimport numpy as np  # alias — saves keystrokes!\\nfrom os.path import join, exists\\n\\nprint(math.pi)                # 3.14159...\\nprint(datetime.now())         # current date/time\\nprint(join("a", "b", "c"))    # a/b/c</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Watch out!</strong> Avoid <code>from module import *</code> — it dumps everything into your namespace and can silently overwrite your variables. It\\\'s the wild west of imports. Be explicit instead!</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">The Standard Library: Python\\\'s Superpower</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python\\\'s standard library is massive. Here are some crowd favorites: <code>os</code> and <code>pathlib</code> for files, <code>json</code> for data, <code>re</code> for pattern matching, <code>math</code> for math stuff, <code>random</code> for... randomness, <code>datetime</code> for time, <code>collections</code> for fancy data structures, and <code>itertools</code> for clever loops:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">import random\\nfrom collections import Counter\\n\\nprint(random.randint(1, 10))  # random number between 1 and 10\\n\\ncounts = Counter("mississippi")\\nprint(counts)  # Counter({\\\'i\\\': 4, \\\'s\\\': 4, \\\'p\\\': 2, \\\'m\\\': 1})</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> Before writing a function yourself, ask: \"Is this already in the standard library?\" The answer is often yes. Python\\\'s motto is \"batteries included\" for a reason!</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Create Your Own Module</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Any <code>.py</code> file is a module. Create one, put some functions in it, then import it from another script. That\\\'s it — you\\\'re a library author now:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># mymodule.py\\ndef greet(name):\\n    return f"Hello, {name}!"\\n\\nPI = 3.14159\\n\\nclass Calculator:\\n    @staticmethod\\n    def add(a, b):\\n        return a + b</code></pre>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># main.py\\nimport mymodule\\n\\nprint(mymodule.greet("Alice"))\\nprint(mymodule.PI)\\ncalc = mymodule.Calculator()\\nprint(calc.add(3, 4))</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> To make a directory of modules (a package), add an <code>__init__.py</code> file (can be empty) and organize your modules inside. Then <code>from mypackage import mymodule</code>.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">pip: The Python App Store</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">The Python Package Index (PyPI) has over 400,000 packages. Install anything with <code>pip install package_name</code>. Want to scrape websites? <code>pip install requests</code>. Analyze data? <code>pip install pandas</code>. Make a web app? <code>pip install flask</code>. The world is your oyster:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Install first: pip install requests\\nimport requests\\n\\nresponse = requests.get("https://api.github.com")\\nprint(response.status_code)  # 200 — it works!\\nprint(response.json())       # parsed JSON data</code></pre>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Import <code>math</code> and use <code>math.sqrt(144)</code> to calculate a square root</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Use <code>random.choice(["red", "green", "blue"])</code> to pick a random color</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Create a module called <code>helpers.py</code> with a function, then import and use it in another file</p>'
      + '</div>'
  },
  {
    id:'debugging',
    title:'Debugging 101 — Become a Code Detective',
    category:'Python Fundamentals',
    content:
      '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Let\\\'s be real — you\\\'ll spend more time fixing bugs than writing code. That\\\'s normal! Debugging isn\\\'t failure; it\\\'s part of the process. The best developers are the ones who debug fastest. Here\\\'s your toolkit:</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">1. Read the Error Message (Seriously)</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python error messages are surprisingly helpful. The last line tells you the error TYPE. The line above tells you WHERE. Read bottom-up:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">Traceback (most recent call last):\n  File "main.py", line 42, in calculate_score\n    return total / count\nZeroDivisionError: division by zero</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">The <code>ZeroDivisionError</code> on line 42 of <code>main.py</code>, inside <code>calculate_score</code>. The variable <code>count</code> was zero. Mystery solved!</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">2. print() Is Your Best Friend</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Sprinkle <code>print()</code> statements to see variable values. Use descriptive labels so you know which print is which:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">print(f"DEBUG: count = {count}, total = {total}")\nprint(f"DEBUG: About to divide...")</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">3. Rubber Duck Debugging</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Explain your code line by line to a rubber duck (or a friend, or your cat). You\\\'ll spot the bug mid-sentence. This works shockingly well.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">4. Binary Search Your Bug</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Comment out half your code. If the bug disappears, it\\\'s in the commented half. If not, it\\\'s in the uncommented half. Repeat until you find it.</p>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Common mistake:</strong> Staring at code hoping the bug reveals itself. Bugs don\\\'t respond to intimidation. Use tools!</p>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">Fix this buggy code: <code>numbers = [1, 2, 3]; for i in range(4): print(numbers[i])</code></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">Add print() statements to find out why this function returns wrong values</p>'
      + '</div>'
  },
  {
    id:'data-structures',
    title:'Mastering Lists, Dicts & Sets',
    category:'Python Fundamentals',
    content:
      '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Python gives you superpowers through its built-in data structures. Choosing the right one makes your code faster AND cleaner. Let\\\'s explore:</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Lists — The Swiss Army Knife</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">fruits = ["apple", "banana", "cherry"]\nfruits.append("dragonfruit")     # Add to end\nfruits.insert(1, "blueberry")    # Insert at position\npopped = fruits.pop()            # Remove from end\nfruits.sort()                    # Alphabetical\n# List comprehension — Python\\\'s superpower:\nsquares = [x**2 for x in range(10)]  # [0,1,4,9,16,25...]\nevens = [x for x in range(20) if x % 2 == 0]</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Dictionaries — Key-Value Pairs</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Dictionaries are lightning-fast lookups. Behind the scenes, they use hash tables — giving O(1) access time. Think of them as labeled drawers:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">student = {"name": "Alex", "age": 19, "grades": [85, 90, 78]}\nprint(student["name"])             # Alex\nstudent["major"] = "Computer Science"  # Add new key\n# Iterate like a pro:\nfor key, value in student.items():\n    print(f"{key}: {value}")\n# Dictionary comprehension:\nsquares = {x: x**2 for x in range(5)}  # {0:0, 1:1, 2:4, ...}</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Sets — Unique Items Only</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Sets automatically remove duplicates and support math operations like union, intersection, and difference. Great for "find unique items" or "what\\\'s in common?":</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">tags = {"python", "coding", "python"}  # {"python", "coding"} — dup gone!\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a | b)  # Union: {1,2,3,4,5,6}\nprint(a & b)  # Intersection: {3,4}\nprint(a - b)  # Difference: {1,2}</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> Use <code>list</code> for ordered data, <code>dict</code> for key-value lookups, <code>set</code> for uniqueness and set math, and <code>tuple</code> for immutable data that shouldn\\\'t change.</p>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Create a list of 5 numbers, then create a new list with each number squared</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Build a dictionary mapping 3 countries to their capitals</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Use a set to find unique words in the sentence: "the cat and the dog and the bird"</p>'
      + '</div>'
  },
  {
    id:'file-io',
    title:'Read & Write Files Like a Pro',
    category:'Intermediate Python',
    content:
      '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Reading and writing files is how your programs interact with the real world — saving data, loading configs, processing logs. Python makes it almost too easy:</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Writing Files</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Write mode creates/replaces the file\nwith open("journal.txt", "w") as f:\n    f.write("Day 1: Learned Python file I/O!\\n")\n    f.write("Day 2: Built something cool\\n")\n\n# Append mode adds to the end\nwith open("journal.txt", "a") as f:\n    f.write("Day 3: Still going strong!\\n")</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Reading Files</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Read entire file at once\nwith open("journal.txt", "r") as f:\n    content = f.read()\n\n# Read line by line (memory efficient)\nwith open("journal.txt", "r") as f:\n    for line in f:\n        print(line.strip())\n\n# Read all lines into a list\nwith open("journal.txt", "r") as f:\n    lines = f.readlines()  # ["Day 1...", "Day 2..."]</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">The Magic of with</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7"><code>with open(...) as f:</code> automatically closes the file when you\\\'re done — even if an error occurs. It\\\'s called a context manager. NEVER open a file without <code>with</code>.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Working with JSON</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">import json\n\ndata = {"name": "Alex", "scores": [88, 92, 79]}\n# Write JSON to file\nwith open("data.json", "w") as f:\n    json.dump(data, f, indent=2)\n# Read JSON from file\nwith open("data.json", "r") as f:\n    loaded = json.load(f)\nprint(loaded["name"])  # Alex</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Watch out:</strong> <code>"w"</code> mode DELETES the file first. Use <code>"a"</code> to append, or check if the file exists before opening with <code>"w"</code>.</p>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Write your name and favorite color to a file called <code>about_me.txt</code></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Read it back and print each line with line numbers</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Create a JSON file with 3 friends\\\' info, then load and display it</p>'
      + '</div>'
  },
  {
    id:'api-basics',
    title:'Talk to the Internet — APIs & Requests',
    category:'Intermediate Python',
    content:
      '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">APIs are how programs talk to other programs over the internet. Every time you check the weather on your phone, it calls an API. Python makes this dead simple:</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Your First API Call</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Install: pip install requests\nimport requests\n\nresponse = requests.get("https://api.github.com")\nprint(response.status_code)  # 200 = success!\nprint(response.headers["Content-Type"])  # application/json\ndata = response.json()\nprint(f"GitHub API says: {data[\\\'current_user_url\\\']}")</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">GET, POST, PUT, DELETE — CRUD for the Web</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># GET — read data\nresp = requests.get("https://jsonplaceholder.typicode.com/posts/1")\npost = resp.json()\nprint(post["title"])\n\n# POST — create data\nnew_post = {"title": "Hello", "body": "World", "userId": 1}\nresp = requests.post("https://jsonplaceholder.typicode.com/posts", json=new_post)\nprint(resp.status_code)  # 201 Created!</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Handling Errors Gracefully</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">try:\n    resp = requests.get("https://api.example.com/data", timeout=5)\n    resp.raise_for_status()  # Raises error for 4xx/5xx codes\n    data = resp.json()\nexcept requests.exceptions.Timeout:\n    print("Request timed out — server is slow")\nexcept requests.exceptions.RequestException as e:\n    print(f"Something went wrong: {e}")</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> Always use <code>timeout</code> parameters. Without it, a hanging server can freeze your program forever. Also, <code>raise_for_status()</code> is your friend — it turns HTTP errors into exceptions you can catch.</p>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Make a GET request to <code>https://jsonplaceholder.typicode.com/users</code> and print all usernames</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. POST a new post to the same API and check the response</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Add error handling with try/except for a deliberately wrong URL</p>'
      + '</div>'
  },
  {
    id:'oop-classes',
    title:'Classes & Objects — Build Your Own Types',
    category:'Intermediate Python',
    content:
      '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">You\\\'ve been using objects all along — strings, lists, dicts are all objects. Now it\\\'s time to build your own. Classes are blueprints; objects are the actual things you build from them:</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Your First Class</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class Superhero:\n    """A class representing a superhero."""\n    \n    def __init__(self, name, power, health=100):\n        self.name = name\n        self.power = power\n        self.health = health\n        self.level = 1\n    \n    def use_power(self):\n        print(f"{self.name} uses {self.power}! 💥")\n        self.level += 1\n    \n    def take_damage(self, amount):\n        self.health -= amount\n        if self.health <= 0:\n            print(f"{self.name} is defeated! 💀")\n        else:\n            print(f"{self.name} has {self.health} HP left")\n\n# Create heroes!\nspidey = Superhero("Spider-Man", "web slinging")\nironman = Superhero("Iron Man", "repulsor blasts", health=150)\nspidey.use_power()    # Spider-Man uses web slinging! 💥\nironman.take_damage(30)  # Iron Man has 120 HP left</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Inheritance — Reuse & Extend</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class FlyingHero(Superhero):\n    """A superhero who can fly."""\n    \n    def __init__(self, name, power, speed, health=100):\n        super().__init__(name, power, health)\n        self.speed = speed\n    \n    def fly(self):\n        print(f"{self.name} zooms through the sky at {self.speed}mph! ✈️")\n\nthor = FlyingHero("Thor", "lightning", speed=500)\nthor.fly()         # Thor zooms through the sky at 500mph! ✈️\nthor.use_power()   # Thor uses lightning! 💥 (inherited!)</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Special Methods (Dunder Methods)</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7"><code>__str__</code>, <code>__repr__</code>, <code>__eq__</code>, <code>__add__</code> — these double-underscore methods make your objects behave like Python built-ins:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n    def __add__(self, other):\n        return Point(self.x + other.x, self.y + other.y)\n\np1 = Point(1, 2)\np2 = Point(3, 4)\nprint(p1)       # (1, 2) — not <__main__.Point object at 0x...>\np3 = p1 + p2    # Uses __add__\nprint(p3)       # (4, 6)</code></pre>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Create a <code>Pet</code> class with name, species, and a <code>feed()</code> method</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Create a <code>BankAccount</code> class with deposit and withdraw methods</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Add <code>__str__</code> to your BankAccount to display the balance nicely</p>'
      + '</div>'
  },
  {
    id:'game-loops',
    title:'Build a Game with While Loops',
    category:'Fun Projects',
    content:
      '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Games are just loops! Every game — from Pong to Fortnite — runs on a game loop: check input, update state, draw screen, repeat. Here\\\'s how to build one:</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">The Game Loop Pattern</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">import random\n\n# Game state\nplayer_hp = 100\nmonster_hp = 50\nround_num = 1\n\nprint("⚔️  BATTLE BEGIN! ⚔️")\n\nwhile player_hp > 0 and monster_hp > 0:\n    print(f"\\n--- Round {round_num} ---")\n    \n    # Player\\\'s turn\n    print(f"Your HP: {player_hp} | Monster HP: {monster_hp}")\n    action = input("Attack (1) or Heal (2)? ")\n    \n    if action == "1":\n        damage = random.randint(10, 25)\n        monster_hp -= damage\n        print(f"You deal {damage} damage!")\n    elif action == "2":\n        heal = random.randint(8, 15)\n        player_hp += heal\n        print(f"You heal {heal} HP!")\n    \n    # Monster\\\'s turn (if alive)\n    if monster_hp > 0:\n        mdamage = random.randint(5, 20)\n        player_hp -= mdamage\n        print(f"Monster hits you for {mdamage} damage!")\n    \n    round_num += 1\n\nif player_hp > 0:\n    print("\\n🎉 You defeated the monster!")\nelse:\n    print("\\n💀 The monster defeated you...")</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">State Machines — Beyond Simple Loops</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Real games use state machines. Each "screen" is a state — menu, playing, paused, game over. Your loop checks the current state and runs different code:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">state = "menu"\n\nwhile state != "quit":\n    if state == "menu":\n        print("\\n1. Start Game  2. Quit")\n        choice = input("> ")\n        if choice == "1": state = "playing"\n        elif choice == "2": state = "quit"\n    \n    elif state == "playing":\n        # ... game code ...\n        print("Playing... press q to quit")\n        if input("> ") == "q": state = "menu"</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">💡 <strong>Pro Tip:</strong> Split your game into functions: <code>handle_input()</code>, <code>update_state()</code>, and <code>render()</code>. This makes your code cleaner and easier to debug.</p>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Expand the battle game — add a magic attack and a shield option</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Add random critical hits (10% chance of double damage)</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Create a simple inventory system as a list that changes during gameplay</p>'
      + '</div>'
  },
  {
    id:'regex',
    title:'Regex — Pattern Matching Magic',
    category:'Intermediate Python',
    content:
      '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Regular expressions (regex) are like Ctrl+F on steroids. They find patterns in text — emails, phone numbers, dates, you name it. They look scary at first, but once you learn the basics, they\\\'re incredibly powerful:</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">The Essential Patterns</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">import re\n\ntext = "Contact me at alex@email.com or call 555-1234"\n\n# \\d = any digit, \\w = any word char, + = one or more\n# @ = literal @ symbol\n# \\. = literal dot (need to escape it)\nemails = re.findall(r\\\'[\\w.+-]+@[\\w-]+\\.[\\w.-]+\\\', text)\nprint(emails)  # [\\\'alex@email.com\\\']\n\n# Find all numbers\nphones = re.findall(r\\\'\\d{3}-\\d{4}\\\', text)\nprint(phones)  # [\\\'555-1234\\\']</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Your Regex Cheat Sheet</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">\\d      digit (0-9)\n\\w      word character (a-z, A-Z, 0-9, _)\n\\s      whitespace (space, tab, newline)\n.       any character except newline\n*       0 or more\n+       1 or more\n?       0 or 1 (makes it optional)\n{3}     exactly 3\n{2,5}   2 to 5 times\n^       start of string\n$       end of string\n[abc]   any of a, b, or c\n[^abc]  NOT a, b, or c\n(abc)   capture group</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Real-World Regex Examples</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Extract all hashtags from a tweet\ntweet = "Loving #python and #coding! #100DaysOfCode"\nhashtags = re.findall(r\\\'#\\w+\\\', tweet)\nprint(hashtags)  # [\\\'#python\\\', \\\'#coding\\\', \\\'#100DaysOfCode\\\']\n\n# Validate a date format (YYYY-MM-DD)\ndate = "2026-05-24"\nif re.match(r\\\'\\d{4}-\\d{2}-\\d{2}\\\', date):\n    print("Valid date format")\n\n# Replace all numbers with [REDACTED]\nsecret = "My PIN is 1234 and SSN is 567-89-0123"\nclean = re.sub(r\\\'\\d+\\\', "[REDACTED]", secret)\nprint(clean)  # My PIN is [REDACTED] and SSN is [REDACTED]-[REDACTED]-[REDACTED]</code></pre>'
      + '<p style="margin:0 0 8px;color:var(--orange);font-size:11px;line-height:1.7">⚠️ <strong>Watch out:</strong> Regex is greedy by default — <code>.*</code> matches as MUCH as possible. Use <code>.*?</code> to match as LITTLE as possible (lazy matching).</p>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Write a regex to extract all capital letters from a string</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Find all words that are exactly 5 letters long in a sentence</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Write a regex that validates whether a string is a valid email address</p>'
      + '</div>'
  },
  {
    id:'datetime',
    title:'Dates & Times — Taming the Clock',
    category:'Intermediate Python',
    content:
      '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Working with dates is notoriously tricky — time zones, leap years, DST. Python\\\'s <code>datetime</code> module handles it all. Let\\\'s master it:</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Creating and Formatting Dates</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">from datetime import datetime, timedelta, date\n\n# Get current date and time\nnow = datetime.now()\nprint(now)  # 2026-05-24 15:30:45.123456\n\n# Create a specific date\nbirthday = datetime(2005, 8, 15, 14, 30)\nprint(birthday.strftime("%B %d, %Y"))  # August 15, 2005\n\n# Format codes:\n# %Y = year (4 digits), %m = month (01-12), %d = day\n# %H = hour (24h), %M = minute, %S = second\n# %A = weekday name, %B = month name</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Time Travel with timedelta</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Add/subtract time\none_week = timedelta(weeks=1)\nnext_week = now + one_week\nyesterday = now - timedelta(days=1)\n\n# Calculate difference\nnew_year = datetime(2027, 1, 1)\ndays_left = new_year - now\nprint(f"{days_left.days} days until 2027!")\n\n# Age calculator\nbirth = date(2000, 6, 15)\ntoday = date.today()\nage = today.year - birth.year\nif today.month < birth.month or (today.month == birth.month and today.day < birth.day):\n    age -= 1\nprint(f"You are {age} years old")</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Parsing Dates from Strings</h4>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Parse a date string\nfrom datetime import datetime\ndate_str = "24/05/2026 15:30"\nparsed = datetime.strptime(date_str, "%d/%m/%Y %H:%M")\nprint(parsed.strftime("%A, %B %d"))  # Sunday, May 24\n\n# Handle different formats\nformats = ["%Y-%m-%d", "%d/%m/%Y", "%B %d, %Y"]\nfor fmt in formats:\n    try:\n        result = datetime.strptime(date_str, fmt)\n        print(f"Parsed with {fmt}: {result}")\n        break\n    except ValueError:\n        continue</code></pre>'
      + '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px">'
      + '<p style="margin:0 0 5px;color:var(--fg);font-size:11px;line-height:1.7">🎯 <strong>Your Turn!</strong></p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">1. Print today\\\'s date in the format "Sunday, May 24, 2026"</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">2. Calculate how many days until your next birthday</p>'
      + '<p style="margin:0 0 3px;color:var(--fg);font-size:11px;line-height:1.7">3. Build a countdown timer that shows days, hours, and minutes until a future date</p>'
      + '</div>'
  }
];

var CODEDICT = [
  { term:'Variable', definition:'A named container that stores data in memory. Variables in Python are dynamically typed, meaning you do not need to declare their type explicitly.' },
  { term:'Function', definition:'A reusable block of code that performs a specific task. Defined with the def keyword, functions can accept parameters and return values.' },
  { term:'Class', definition:'A blueprint for creating objects. Classes bundle data (attributes) and behavior (methods) together, forming the basis of object-oriented programming.' },
  { term:'Object', definition:'An instance of a class. Objects have state (attributes) and behavior (methods) defined by their class.' },
  { term:'Method', definition:'A function that belongs to a class instance. Methods operate on the object\'s data and are called using dot notation.' },
  { term:'Attribute', definition:'A variable that belongs to an object or class. Attributes hold the state or data of an object.' },
  { term:'Loop', definition:'A control structure that repeats a block of code multiple times. Python has for loops (iteration over sequences) and while loops (conditional repetition).' },
  { term:'Conditional', definition:'A statement that executes different code based on a boolean condition. Python uses if, elif, and else for conditional execution.' },
  { term:'Recursion', definition:'A technique where a function calls itself to solve a problem by breaking it into smaller subproblems. Requires a base case to prevent infinite recursion.' },
  { term:'Iteration', definition:'The process of repeatedly executing a block of code, typically using a loop. Iterable objects can be traversed element by element.' },
  { term:'List', definition:'An ordered, mutable collection of items enclosed in square brackets. Lists can hold mixed types and support indexing, slicing, and various methods.' },
  { term:'Dictionary', definition:'A collection of key-value pairs enclosed in curly braces. Dictionaries provide O(1) average lookup time and are mutable.' },
  { term:'Set', definition:'An unordered collection of unique elements enclosed in curly braces. Sets support mathematical operations like union, intersection, and difference.' },
  { term:'Tuple', definition:'An ordered, immutable collection of items enclosed in parentheses. Tuples are hashable and can be used as dictionary keys.' },
  { term:'Array', definition:'A data structure that stores elements of the same type in contiguous memory. Python lists are dynamic arrays; the array module provides typed arrays.' },
  { term:'String', definition:'A sequence of characters enclosed in quotes. Strings are immutable in Python and support indexing, slicing, and many built-in methods.' },
  { term:'Integer', definition:'A whole number data type (positive, negative, or zero). Python integers have arbitrary precision, limited only by available memory.' },
  { term:'Float', definition:'A floating-point number representing real numbers with decimal points. Floats have limited precision due to binary representation.' },
  { term:'Boolean', definition:'A data type with two values: True and False. Booleans are the result of comparison operators and are used in conditional statements.' },
  { term:'Null', definition:'A value representing nothing or no value. In Python, None is used instead of null found in other languages.' },
  { term:'Undefined', definition:'A state where a variable has been declared but not assigned a value. Python raises NameError for undefined variables.' },
  { term:'Parameter', definition:'A variable listed in a function\'s definition that receives an argument when the function is called.' },
  { term:'Argument', definition:'A value passed to a function when calling it. Arguments are assigned to the corresponding parameters in the function definition.' },
  { term:'Return', definition:'A keyword that exits a function and optionally sends a value back to the caller. Functions without a return statement return None.' },
  { term:'Import', definition:'A keyword that loads a module or specific items from a module into the current namespace for use in your code.' },
  { term:'Module', definition:'A file containing Python definitions and statements. Modules allow code reuse and organization of related functionality.' },
  { term:'Package', definition:'A directory containing multiple modules and an __init__.py file. Packages enable hierarchical organization of modules.' },
  { term:'Library', definition:'A collection of pre-written code that provides specific functionality for reuse. Python\'s standard library is a core example.' },
  { term:'Framework', definition:'A platform providing a foundation for developing applications. Frameworks dictate architecture and flow, unlike libraries which are called by your code.' },
  { term:'API', definition:'Application Programming Interface — a set of defined rules and protocols for building and interacting with software applications.' },
  { term:'IDE', definition:'Integrated Development Environment — a software application providing comprehensive tools for coding, debugging, testing, and project management.' },
  { term:'Compiler', definition:'A program that translates source code into machine code or bytecode all at once before execution. C, C++, and Rust use compilers.' },
  { term:'Interpreter', definition:'A program that executes source code line by line without prior compilation. Python, JavaScript, and Ruby are interpreted languages.' },
  { term:'Debugger', definition:'A tool that helps find and fix errors in code by allowing step-by-step execution, breakpoints, variable inspection, and call stack analysis.' },
  { term:'Syntax', definition:'The set of rules that defines the structure of valid code in a programming language. Syntax errors occur when code violates these rules.' },
  { term:'Semantics', definition:'The meaning or behavior of syntactically valid code. Semantic errors produce unintended results without crashing the program.' },
  { term:'Algorithm', definition:'A step-by-step procedure for solving a problem or accomplishing a task. Algorithms are the foundation of computer programming.' },
  { term:'Data Structure', definition:'A specialized format for organizing, processing, and storing data. Common structures include arrays, linked lists, stacks, queues, trees, and graphs.' },
  { term:'Stack', definition:'A linear data structure that follows LIFO (Last In, First Out) order. Elements are added (pushed) and removed (popped) from the top.' },
  { term:'Queue', definition:'A linear data structure that follows FIFO (First In, First Out) order. Elements are added at the rear and removed from the front.' },
  { term:'Tree', definition:'A hierarchical data structure consisting of nodes connected by edges. Each node has a parent and zero or more children. Binary trees are a common variant.' },
  { term:'Graph', definition:'A non-linear data structure consisting of vertices (nodes) and edges (connections). Graphs model relationships like social networks and maps.' },
  { term:'Hash Table', definition:'A data structure that maps keys to values using a hash function. Provides O(1) average time for insertion, deletion, and lookup. Python dictionaries are hash tables.' },
  { term:'Binary Search', definition:'An efficient algorithm that finds a target value in a sorted array by repeatedly dividing the search interval in half. Time complexity is O(log n).' },
  { term:'Inheritance', definition:'An OOP concept where a class inherits attributes and methods from a parent class. Enables code reuse and hierarchical classification.' },
  { term:'Polymorphism', definition:'An OOP concept where objects of different classes respond to the same method call in their own way. Enables flexible and extensible code.' },
  { term:'Encapsulation', definition:'An OOP principle of bundling data and methods within a class, restricting direct access to internal state. Implemented via naming conventions and properties.' },
  { term:'Abstraction', definition:'An OOP principle of hiding complex implementation details and exposing only essential features. Reduces complexity and increases usability.' },
  { term:'Constructor', definition:'A special method (__init__) that is automatically called when creating a new object. Initializes the object\'s attributes and state.' },
  { term:'Destructor', definition:'A special method (__del__) called when an object is about to be destroyed. Used for cleanup like closing files or releasing resources.' },
  { term:'Getter', definition:'A method that returns the value of an attribute. In Python, the @property decorator creates getter methods accessed like attributes.' },
  { term:'Setter', definition:'A method that sets the value of an attribute. In Python, the @attribute.setter decorator provides controlled attribute assignment.' },
  { term:'Decorator', definition:'A function that takes another function and extends its behavior without modifying its structure. Denoted by the @ symbol.' },
  { term:'Generator', definition:'A function that yields values one at a time using the yield keyword. Generators produce items lazily, making them memory-efficient for large sequences.' },
  { term:'Iterator', definition:'An object that implements the iterator protocol with __iter__() and __next__() methods. Allows traversal through a sequence of elements.' },
  { term:'Comprehension', definition:'A concise syntax for creating collections from iterables. Python supports list, dict, and set comprehensions with optional filtering conditions.' },
  { term:'Lambda', definition:'A small anonymous function defined with the lambda keyword. Can have any number of arguments but only one expression.' },
  { term:'Closure', definition:'A function that retains access to variables from its enclosing scope even after the outer function has finished executing.' },
  { term:'Callback', definition:'A function passed as an argument to another function, to be executed later when a specific event occurs or condition is met.' },
  { term:'Promise', definition:'An object representing the eventual completion or failure of an asynchronous operation. Promises provide .then() and .catch() for handling results.' },
  { term:'Async', definition:'Short for asynchronous — a programming pattern that allows operations to run without blocking the main thread. Python uses async/await syntax.' },
  { term:'Await', definition:'A keyword used in async functions to pause execution until a promise or awaitable completes, without blocking the event loop.' },
  { term:'Thread', definition:'The smallest unit of execution within a process. Multiple threads share the same memory space and can run concurrently.' },
  { term:'Process', definition:'An independent program in execution with its own memory space. Processes are isolated from each other for security and stability.' },
  { term:'Socket', definition:'An endpoint for network communication between two programs. Sockets enable data exchange over TCP/IP or UDP networks.' },
  { term:'Protocol', definition:'A set of rules governing data communication between devices. Common protocols include HTTP, TCP, UDP, FTP, and WebSocket.' },
  { term:'HTTP', definition:'Hypertext Transfer Protocol — the foundation of data communication on the web. Defines methods like GET, POST, PUT, and DELETE.' },
  { term:'HTML', definition:'Hypertext Markup Language — the standard language for creating web pages. Uses tags to structure content with elements like headings, paragraphs, and links.' },
  { term:'CSS', definition:'Cascading Style Sheets — a stylesheet language that controls the presentation and layout of HTML documents, including colors, fonts, and spacing.' },
  { term:'JavaScript', definition:'A dynamic programming language primarily used for web development. Enables interactive client-side behavior in browsers.' },
  { term:'DOM', definition:'Document Object Model — a programming interface for HTML and XML documents. Represents the page as a tree of objects that can be manipulated with JavaScript.' },
  { term:'JSON', definition:'JavaScript Object Notation — a lightweight data-interchange format that is easy for humans to read and machines to parse. Widely used in APIs.' },
  { term:'XML', definition:'eXtensible Markup Language — a markup language for encoding documents in a format readable by both humans and machines. Used for data exchange and configuration.' },
  { term:'SQL', definition:'Structured Query Language — a domain-specific language for managing and querying relational databases. Used for CRUD operations on structured data.' },
  { term:'NoSQL', definition:'A category of database management systems that do not use traditional SQL-based relational models. Includes document, key-value, column-family, and graph databases.' },
  { term:'Git', definition:'A distributed version control system for tracking changes in source code during development. Supports branching, merging, and collaborative workflows.' },
  { term:'Repository', definition:'A storage location for software packages or version-controlled projects. Contains all files, history, and metadata for a project.' },
  { term:'Commit', definition:'A snapshot of changes in a Git repository. Each commit has a unique hash, author, timestamp, and message describing the changes.' },
  { term:'Branch', definition:'A parallel version of a Git repository that diverges from the main line of development. Branches enable isolated feature development and experimentation.' },
  { term:'Merge', definition:'The process of integrating changes from one Git branch into another. Merge commits combine the histories of both branches.' },
  { term:'Pull Request', definition:'A GitHub/GitLab feature that proposes changes from one branch to another. Enables code review, discussion, and automated checks before merging.' },
  { term:'Pip', definition:'Python\'s package installer. Downloads and installs packages from the Python Package Index (PyPI) and manages dependencies.' },
  { term:'Virtual Environment', definition:'An isolated Python environment with its own dependencies and Python version. Created with venv or virtualenv to avoid conflicts between projects.' },
  { term:'PEP8', definition:'Python Enhancement Proposal 8 — the official style guide for Python code. Covers naming conventions, indentation, line length, and code layout.' },
  { term:'Linting', definition:'The process of analyzing code for potential errors, style violations, and suspicious patterns. Tools like flake8 and pylint automate linting.' },
  { term:'Type Hinting', definition:'A syntax introduced in Python 3.5 for annotating function parameters and return values with expected types. Improves code readability and enables static type checking.' },
  { term:'F-string', definition:'A string literal prefixed with f or F that allows embedding expressions inside curly braces. Provides concise and readable string formatting in Python 3.6+.' },
  { term:'List Comprehension', definition:'A compact syntax for creating lists by applying an expression to each item in an iterable, optionally with a filter condition. Example: [x**2 for x in range(10)]' },
  { term:'Slicing', definition:'A syntax for extracting a portion of a sequence using the start:stop:step notation. Works on strings, lists, tuples, and other sequences.' },
  { term:'Enumerate', definition:'A built-in function that adds a counter to an iterable, returning pairs of (index, element). Useful for looping with both index and value.' },
  { term:'Zip', definition:'A built-in function that aggregates elements from multiple iterables into tuples. Stops at the shortest iterable.' },
  { term:'Map', definition:'A built-in function that applies a given function to each item of an iterable and returns an iterator of results.' },
  { term:'Filter', definition:'A built-in function that constructs an iterator from elements of an iterable for which a function returns True.' },
  { term:'Recursion', definition:'A technique where a function calls itself to solve a problem by breaking it into smaller versions. Every recursive function needs a base case to stop.' },
  { term:'API', definition:'Application Programming Interface — a set of rules allowing programs to talk to each other. Web APIs use HTTP requests to send and receive data (usually JSON).' },
  { term:'JSON', definition:'JavaScript Object Notation — a lightweight data format that is easy for humans to read and write and easy for machines to parse and generate.' },
  { term:'CSV', definition:'Comma-Separated Values — a simple file format for storing tabular data. Each line is a row, commas separate columns. Excel spreadsheets can be exported as CSV.' },
  { term:'Git', definition:'A distributed version control system that tracks changes in code. Developers use Git to collaborate, backup work, and manage different versions of a project.' },
  { term:'Repository', definition:'A storage location for code, typically hosted on GitHub or GitLab. Contains all files, commit history, and branches for a project.' },
  { term:'Commit', definition:'A snapshot of changes in a Git repository. Each commit has a unique hash, a message describing the changes, and metadata about who made it and when.' },
  { term:'Branch', definition:'A parallel version of a repository. Developers create branches to work on features without affecting the main codebase. Branches can be merged back later.' },
  { term:'Merge Conflict', definition:'Occurs when Git cannot automatically combine two branches. Developers must manually resolve conflicting changes before completing the merge.' },
  { term:'CLI', definition:'Command Line Interface — a text-based way to interact with a computer. You type commands and get text output. More powerful than GUIs for many tasks.' },
  { term:'IDE', definition:'Integrated Development Environment — software that combines code editor, debugger, and build tools. Examples: VS Code, PyCharm, IntelliJ.' },
  { term:'Syntax Error', definition:'A mistake in the grammar of your code. The computer cannot understand the instruction. Python points to the line with the error and sometimes the exact character.' },
  { term:'Runtime Error', definition:'An error that occurs while the program is running, not during parsing. Examples: division by zero, accessing an out-of-bounds list index, or calling a method on None.' },
  { term:'Logic Error', definition:'The hardest bug — your code runs without errors but produces wrong results. No error message helps you. You must trace through your logic to find the mistake.' },
  { term:'Refactoring', definition:'Restructuring existing code without changing its external behavior. Improves readability, reduces complexity, or makes the code easier to extend.' },
  { term:'DRY', definition:'Don\'t Repeat Yourself — a programming principle. If you find yourself copying and pasting code, create a function instead. Less duplication = fewer bugs.' },
  { term:'Algorithm', definition:'A step-by-step procedure for solving a problem. Like a recipe — follow the steps in order, and you get the result. Sorting, searching, and pathfinding are common algorithms.' },
  { term:'Big O Notation', definition:'A way to describe how fast an algorithm runs as the input size grows. O(1) is constant time, O(n) is linear, O(n²) is quadratic. Helps predict performance.' },
  { term:'Data Structure', definition:'A way to organize and store data so it can be accessed efficiently. Lists, dictionaries, trees, graphs, and hash tables are all data structures.' },
  { term:'Stack', definition:'A LIFO (Last In, First Out) data structure. Like a stack of plates — you can only add or remove from the top. Used for undo/redo and function calls.' },
  { term:'Queue', definition:'A FIFO (First In, First Out) data structure. Like a line at a store — the first person in line is served first. Used for task scheduling and print spooling.' },
  { term:'Binary Search', definition:'An efficient O(log n) search algorithm that works on sorted data. Repeatedly divides the search range in half. Much faster than linear search for large datasets.' },
  { term:'Hash Table', definition:'A data structure that maps keys to values using a hash function. Provides O(1) average lookup time. Python dictionaries are hash tables.' },
  { term:'Mutable', definition:'An object that can be changed after creation. Lists and dictionaries are mutable in Python. Be careful — modifying a mutable object affects all references to it.' },
  { term:'Immutable', definition:'An object that cannot be changed after creation. Strings, integers, and tuples are immutable in Python. Operations on them create new objects instead.' },
  { term:'Lambda', definition:'A small anonymous function defined with the lambda keyword. Useful for short operations passed as arguments: sorted(items, key=lambda x: x.age).' },
  { term:'Decorator', definition:'A function that modifies another function\'s behavior. Written with @decorator_name above a function. Used for logging, timing, access control, and caching.' },
  { term:'Generator', definition:'A function that yields values one at a time instead of returning them all at once. Uses yield instead of return. Memory efficient for large sequences.' },
  { term:'Virtualenv', definition:'A tool for creating isolated Python environments. Each environment has its own packages and Python version. Essential for managing project dependencies.' },
  { term:'Pip', definition:'The package installer for Python. Use pip install package_name to download and install libraries from the Python Package Index (PyPI).' },
  { term:'Flask', definition:'A lightweight Python web framework. Easy to learn and perfect for small to medium web applications. Uses decorators to define URL routes.' },
  { term:'Django', definition:'A full-featured Python web framework. Includes ORM, admin panel, authentication, and templating. Follows the "batteries included" philosophy.' },
  { term:'SQL', definition:'Structured Query Language — used to communicate with databases. SELECT reads data, INSERT adds it, UPDATE changes it, DELETE removes it.' },
  { term:'ORM', definition:'Object-Relational Mapping — a technique that lets you interact with databases using Python objects instead of writing raw SQL queries.' },
  { term:'CSS', definition:'Cascading Style Sheets — controls the visual appearance of HTML documents. Defines colors, fonts, layouts, animations, and responsive designs.' },
  { term:'HTML', definition:'HyperText Markup Language — the skeleton of every web page. Uses tags like <p>, <div>, <img> to structure content.' },
  { term:'DOM', definition:'Document Object Model — a tree representation of an HTML document. JavaScript can manipulate the DOM to dynamically change page content.' },
  { term:'Async', definition:'Asynchronous programming allows tasks to run without blocking the main thread. Uses async/await keywords. Essential for handling many network requests at once.' },
  { term:'Threading', definition:'Running multiple operations concurrently within a single process. Python threads share memory but are limited by the GIL. Good for I/O-bound tasks.' },
  { term:'Multiprocessing', definition:'Running multiple Python processes in parallel. Each process has its own memory and Python interpreter. Best for CPU-bound tasks.' }
];

var CODEPROJECTS = [
  {
    id:'hello-world',
    title:'Hello, World!',
    difficulty:'Beginner',
    description:'Write a program that prints a personalized greeting.',
    starter:'# Hello, World!\n# Change the name below and run again!\n\nname = "Alex"\nprint(f"Hello, {name}!")\n\n# Try with different names or add more messages',
    hint:'Use an f-string to include the name in the greeting: f"Hello, {name}!"'
  },
  {
    id:'calculator',
    title:'Simple Calculator',
    difficulty:'Beginner',
    description:'Create a calculator that takes two numbers and an operator and displays the result.',
    starter:'# Simple Calculator\n# Change these values to try different calculations\n\na = 15\nb = 7\nop = "+"\n\nif op == "+":\n    result = a + b\nelif op == "-":\n    result = a - b\nelif op == "*":\n    result = a * b\nelif op == "/":\n    result = a / b\nelse:\n    result = "Invalid operator"\n\nprint(f"{a} {op} {b} = {result}")',
    hint:'Change a, b, and op to test different calculations. Try division by zero — what happens?'
  },
  {
    id:'number-guessing',
    title:'Number Guessing Game',
    difficulty:'Beginner',
    description:'Generate a random number between 1 and 100 and try to guess it with hints.',
    starter:'# Number Guessing Game\nimport random\n\nsecret = random.randint(1, 100)\n# Simulate guesses (change these to try different strategies!)\nguesses = [50, 75, 88, 82, 80]\n\nfor i, guess in enumerate(guesses, 1):\n    print(f"Guess #{i}: {guess}")\n    if guess < secret:\n        print("Too low!")\n    elif guess > secret:\n        print("Too high!")\n    else:\n        print(f"Correct! Found in {i} tries!")\n        break\nelse:\n    print(f"The number was {secret}")',
    hint:'Use random.randint(1, 100) to generate the secret number. Try binary search: start at 50, then 25 or 75.'
  },
  {
    id:'todo-list',
    title:'To-Do List Manager',
    difficulty:'Intermediate',
    description:'Build a to-do list that can add, view, complete, and delete tasks.',
    starter:'# To-Do List Manager\ntodos = []\n\ndef show_todos():\n    if not todos:\n        print("No tasks yet!")\n    else:\n        for i, task in enumerate(todos, 1):\n            status = "[✓]" if task["done"] else "[ ]"\n            print(f"{i}. {status} {task[\'title\']}")\n\ndef add_task(title):\n    todos.append({"title": title, "done": False})\n    print(f"Added: {title}")\n\ndef complete_task(index):\n    if 0 <= index < len(todos):\n        todos[index]["done"] = True\n        print(f"Completed: {todos[index][\'title\']}")\n\ndef delete_task(index):\n    if 0 <= index < len(todos):\n        removed = todos.pop(index)\n        print(f"Deleted: {removed[\'title\']}")\n\n# Demo — change these commands to try the app!\nadd_task("Learn Python")\nadd_task("Build a project")\nadd_task("Practice daily")\nshow_todos()\ncomplete_task(0)\nprint("\\nAfter completing task 1:")\nshow_todos()',
    hint:'Try adding more tasks, completing different ones, or deleting tasks. The index starts at 0!'
  },
  {
    id:'temperature-converter',
    title:'Temperature Converter',
    difficulty:'Beginner',
    description:'Convert temperatures between Celsius, Fahrenheit, and Kelvin.',
    starter:'# Temperature Converter\n\ndef c_to_f(c): return (c * 9/5) + 32\ndef f_to_c(f): return (f - 32) * 5/9\ndef c_to_k(c): return c + 273.15\ndef k_to_c(k): return k - 273.15\n\n# Try changing these values!\ntemp = 25  # Celsius\n\nprint(f"Input: {temp}°C")\nprint(f"  Fahrenheit: {c_to_f(temp):.1f}°F")\nprint(f"  Kelvin: {c_to_k(temp):.1f}K")\n\n# Convert back\nf = c_to_f(temp)\nprint(f"\\nRound-trip: {f}°F -> {f_to_c(f):.1f}°C")',
    hint:'Try different temperatures. Bonus: add rankine, reaumur, or other scales!'
  },
  {
    id:'word-counter',
    title:'Word Counter',
    difficulty:'Beginner',
    description:'Count words, characters, lines, and word frequency in a text.',
    starter:'# Word Counter\nfrom collections import Counter\n\n# Change this text to count different passages\ntext = """Python is a great programming language.\nPython is easy to learn and fun to use.\nMany developers love Python for its simplicity."""\n\nwords = text.split()\nchars = len(text)\nlines = text.count("\\n") + 1\n\nprint(f"Words: {len(words)}")\nprint(f"Characters: {chars}")\nprint(f"Lines: {lines}")\nprint(f"Avg word length: {chars / len(words):.1f}")\n\nword_freq = Counter(w.lower().strip(".,!?;:\\\'\\\"") for w in words)\nprint("\\nTop 5 words:")\nfor word, count in word_freq.most_common(5):\n    print(f"  {word}: {count}")',
    hint:'Use collections.Counter for frequency. Replace the text variable with your own paragraph!'
  },
  {
    id:'quiz-game',
    title:'Quiz Game',
    difficulty:'Intermediate',
    description:'Build a multiple-choice quiz that keeps score and shows a final grade.',
    starter:'# Quiz Game\n\nquestions = [\n    {"q": "What keyword defines a function in Python?",\n     "opts": ["func", "def", "define", "lambda"], "ans": 1},\n    {"q": "Which data type is immutable?",\n     "opts": ["list", "dict", "tuple", "set"], "ans": 2},\n    {"q": "What does len([]) return?",\n     "opts": ["Type", "Length", "Memory", "Hash"], "ans": 1},\n    {"q": "What is 2 ** 3?",\n     "opts": ["6", "8", "9", "5"], "ans": 1},\n    {"q": "Which creates a list?",\n     "opts": ["(1,2)", "[1,2]", "{1,2}", "1,2"], "ans": 1},\n]\n\n# Simulated answers (change indexes to test different scores!)\nuser_answers = [1, 2, 1, 1, 1]\nscore = 0\n\nfor i, q in enumerate(questions):\n    print(f"\\nQ{i+1}: {q[\'q\']}")\n    for j, opt in enumerate(q["opts"]):\n        print(f"  {j+1}. {opt}")\n    ans = user_answers[i]\n    if ans == q["ans"]:\n        print(f"  ✓ Correct! (you chose {ans+1})")\n        score += 1\n    else:\n        correct = q["opts"][q["ans"]]\n        print(f"  ✗ Wrong! (you chose {ans+1}, answer: {correct})")\n\npct = score / len(questions) * 100\nprint(f"\\nScore: {score}/{len(questions)} — {pct:.0f}%")',
    hint:'Change user_answers to test different scores. Can you add more questions?'
  },
  {
    id:'password-generator',
    title:'Password Generator',
    difficulty:'Beginner',
    description:'Generate random passwords with customizable length and character types.',
    starter:'# Password Generator\nimport random\nimport string\n\ndef generate_password(length=12, upper=True, lower=True, digits=True, symbols=True):\n    chars = ""\n    if upper: chars += string.ascii_uppercase\n    if lower: chars += string.ascii_lowercase\n    if digits: chars += string.digits\n    if symbols: chars += string.punctuation\n    if not chars: return "Select at least one character type!"\n    return "".join(random.choice(chars) for _ in range(length))\n\n# Try changing the settings!\nprint("=== Password Generator ===")\np1 = generate_password()\nprint(f"Default (12 chars, all types): {p1}")\n\np2 = generate_password(20, symbols=False)\nprint(f"20 chars, no symbols:         {p2}")\n\np3 = generate_password(8, lower=False, digits=False)\nprint(f"8 chars, upper+symbols only:  {p3}")\n\nprint(f"\\nAll passwords are {len(p1)}-{len(p2)} characters")',
    hint:'Use string.ascii_uppercase, string.digits, etc. Try generate_password(16) for longer passwords!'
  },
  {
    id:'hangman',
    title:'Hangman Game',
    difficulty:'Intermediate',
    description:'Build the classic Hangman word-guessing game.',
    starter:'# Hangman Game\nimport random\n\nwords = ["python", "programming", "computer", "algorithm",\n         "database", "network", "function", "variable"]\nword = random.choice(words).lower()\n\n# Simulated guesses (change these!)\nguesses = ["a", "e", "i", "o", "u", "p", "n", "t"]\nguessed = set()\ntries = 6\n\nfor guess in guesses:\n    if tries <= 0: break\n    if len(guess) != 1 or not guess.isalpha():\n        print(f"\'{guess}\' is not a valid letter")\n        continue\n    if guess in guessed:\n        print(f"\'{guess}\' already guessed")\n        continue\n    guessed.add(guess)\n    if guess not in word:\n        tries -= 1\n        print(f"✗ \'{guess}\' not in word ({tries} tries left)")\n    else:\n        display = "".join(c if c in guessed else "_" for c in word)\n        print(f"✓ \'{guess}\' found! Word: {display}")\n        if "_" not in display:\n            print(f"🎉 You won! The word was: {word}")\n            break\nelse:\n    display = "".join(c if c in guessed else "_" for c in word)\n    if "_" in display:\n        print(f"Game over! Word was: {word}")',
    hint:'Try different sets of guesses to win faster. Which letters are most common in English?'
  },
  {
    id:'tic-tac-toe',
    title:'Tic-Tac-Toe',
    difficulty:'Intermediate',
    description:'Build a two-player Tic-Tac-Toe game on the command line.',
    starter:'# Tic-Tac-Toe\n\ndef print_board(board):\n    print()\n    for row in board:\n        print(" " + " | ".join(row))\n        print("---" * 3)\n\ndef check_winner(board):\n    for i in range(3):\n        if board[i][0] == board[i][1] == board[i][2] != " ":\n            return board[i][0]\n        if board[0][i] == board[1][i] == board[2][i] != " ":\n            return board[0][i]\n    if board[0][0] == board[1][1] == board[2][2] != " ":\n        return board[0][0]\n    if board[0][2] == board[1][1] == board[2][0] != " ":\n        return board[0][2]\n    return None\n\nboard = [[" " for _ in range(3)] for _ in range(3)]\n# Simulated moves: (row, col, player)\nmoves = [(0,0,"X"), (1,1,"O"), (0,1,"X"), (2,2,"O"), (0,2,"X")]\n\nfor row, col, player in moves:\n    if board[row][col] != " ":\n        print(f"Invalid move at ({row},{col})")\n        continue\n    board[row][col] = player\n    print(f"Player {player} plays ({row},{col}):")\n    print_board(board)\n    winner = check_winner(board)\n    if winner:\n        print(f"Player {winner} wins! 🎉")\n        break\nelse:\n    if all(c != " " for r in board for c in r):\n        print("It\'s a draw!")\n    else:\n        print("Game incomplete — add more moves!")',
    hint:'Add more moves to the list to finish the game. Try creating a win for O!'
  },
  {
    id:'simple-webpage',
    title:'Simple Web Page Generator',
    difficulty:'Intermediate',
    description:'Generate a simple HTML webpage from Python data.',
    starter:'# Simple Web Page Generator\n\ndef generate_html(title, heading, paragraphs, bg="#f0f4f8", color="#333"):\n    html = f"""<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>{title}</title>\n    <style>\n        body {{ font-family: system-ui, sans-serif;\n               background: {bg}; color: {color};\n               padding: 40px; line-height: 1.7; }}\n        h1 {{ color: {color}; }}\n        p {{ margin-bottom: 16px; }}\n    </style>\n</head>\n<body>\n    <h1>{heading}</h1>\\n"""\n    for p in paragraphs:\n        html += f"    <p>{p}</p>\\n"\n    html += """</body>\\n</html>"""\n    return html\n\n# Change these to create your own page!\ntitle = "My First Webpage"\nheading = "Welcome to PythonWeb"\nparagraphs = [\n    "Python can generate HTML files automatically.",\n    "This page was created by a Python script!",\n    "You can change the title, heading, and text above.",\n]\n\nhtml = generate_html(title, heading, paragraphs)\nprint(html)\nprint(f"\\n({len(html)} characters of HTML generated)")',
    hint:'Try changing the title, heading, and paragraphs. Use double curly braces {{ }} for literal braces in f-strings.'
  }
];

var CODECHALLENGES = [
  {
    id:'sum-two',
    title:'Mission 1: The Adder',
    desc:'<div style="font-size:10px;line-height:1.6;color:var(--fg);margin-bottom:8px"><b>🎯 Objective:</b> Create a function that adds two numbers together.<br><br><b>📖 Background:</b> Functions are the building blocks of programming. They take inputs (called parameters), do something with them, and return a result. Think of a function like a vending machine: you put money in (input), it processes, and gives you a snack (output).<br><br><b>🧠 What You\'ll Learn:</b> Function definition with <code>def</code>, parameters, return values, and basic arithmetic.</div>',
    template:'def add(a, b):\n    # a and b are your two numbers\n    # Return their sum\n    pass\n\n# After you finish, the grader will test your function\n# with different inputs like add(2, 3) and add(-1, 1)',
    tests:[['add(2, 3)', '5'],['add(-1, 1)', '0'],['add(0, 0)', '0'],['add(100, 200)', '300']],
    hints:['You just need to return the result of adding the two parameters.',"Use the + operator: return a + b","Replace 'pass' with: return a + b"]
  },
  {
    id:'is-even',
    title:'Mission 2: Even Stevens',
    desc:'<div style="font-size:10px;line-height:1.6;color:var(--fg);margin-bottom:8px"><b>🎯 Objective:</b> Write a function that checks if a number is even.<br><br><b>📖 Background:</b> An even number is divisible by 2 with no remainder. The modulo operator (%) gives you the remainder after division. For example, 7 % 2 = 1 (7 divided by 2 leaves remainder 1). If the remainder is 0, the number is even!<br><br><b>🧠 Key Concept:</b> <code>n % 2 == 0</code> is True for even numbers. This is a Boolean expression — it evaluates to True or False. Your function should return this Boolean value.</div>',
    template:'def is_even(n):\n    # n is any integer\n    # Return True if n is even, False otherwise\n    # Hint: Use the modulo operator %\n    pass',
    tests:[['is_even(4)', 'True'],['is_even(7)', 'False'],['is_even(0)', 'True'],['is_even(1)', 'False']],
    hints:['An even number is divisible by 2 with no remainder.','Use the modulo operator: n % 2 gives you the remainder.','Return n % 2 == 0 — this will be True for even numbers.']
  },
  {
    id:'factorial',
    title:'Mission 3: Factorial Factory',
    desc:'<div style="font-size:10px;line-height:1.6;color:var(--fg);margin-bottom:8px"><b>🎯 Objective:</b> Calculate n! (n factorial).<br><br><b>📖 Background:</b> Factorial is a fundamental math concept used in probability, combinatorics, and algorithms. n! = n × (n-1) × (n-2) × ... × 1. For example, 5! = 5×4×3×2×1 = 120. Special case: 0! = 1 (by definition).<br><br><b>🧠 Key Concept:</b> Use a loop that multiplies numbers together. Start with result = 1, then multiply by 1, 2, 3, ..., n.</div>',
    template:'def factorial(n):\n    # n is a non-negative integer\n    # Return n! (n factorial)\n    # Remember: 0! = 1\n    pass',
    tests:[['factorial(0)', '1'],['factorial(1)', '1'],['factorial(5)', '120'],['factorial(3)', '6']],
    hints:['n! means multiply all numbers from 1 to n. 5! = 5×4×3×2×1 = 120.','Start with result = 1, then loop from 1 to n, multiplying each time.','result = 1\nfor i in range(1, n+1):\n    result *= i\nreturn result']
  },
  {
    id:'max-of-three',
    title:'Mission 4: The Decider',
    desc:'<div style="font-size:10px;line-height:1.6;color:var(--fg);margin-bottom:8px"><b>🎯 Objective:</b> Find the largest of three numbers.<br><br><b>📖 Background:</b> Comparison logic is essential in programming. Every time an app sorts a list, picks the best score, or finds the shortest route — it\'s comparing values. You\'ll use <code>if/elif</code> statements (conditional branching) to make decisions.<br><br><b>🧠 Key Concept:</b> Python\'s built-in <code>max()</code> function can do this instantly. But building it yourself teaches you how comparison logic works under the hood.</div>',
    template:'def max_of_three(a, b, c):\n    # a, b, c are three numbers\n    # Return whichever is largest\n    # Approach 1: Use if/elif comparisons\n    # Approach 2: Use Python\'s max() function\n    pass',
    tests:[['max_of_three(1,2,3)', '3'],['max_of_three(5,3,4)', '5'],['max_of_three(-1,-2,-3)', '-1'],['max_of_three(7,7,1)', '7']],
    hints:['Compare a with b: find the larger. Then compare that with c.','Use nested if statements or Python\'s max()','return max(a, b, c) — simple and clean!']
  },
  {
    id:'palindrome',
    title:'Mission 5: Mirror Words',
    desc:'<div style="font-size:10px;line-height:1.6;color:var(--fg);margin-bottom:8px"><b>🎯 Objective:</b> Check if a word reads the same backward as forward.<br><br><b>📖 Background:</b> Palindromes are words or phrases that are identical when reversed. "racecar", "madam", and "a" are palindromes. "hello" is not. This is a classic interview question that tests your string manipulation skills.<br><br><b>🧠 Key Concept:</b> Python has a powerful slicing feature: <code>s[::-1]</code> reverses any string. The slice <code>[start:stop:step]</code> with step=-1 goes backwards!</div>',
    template:'def is_palindrome(s):\n    # s is any string\n    # Return True if s reads the same forward and backward\n    # Hint: Try reversing the string first\n    pass',
    tests:[['is_palindrome("racecar")', 'True'],['is_palindrome("hello")', 'False'],['is_palindrome("a")', 'True'],['is_palindrome("madam")', 'True']],
    hints:['A palindrome reads the same backward and forward. "racecar" reversed is still "racecar".','To reverse a string: s[::-1] — the ::-1 means step backwards.','return s == s[::-1]']
  },
  {
    id:'fizzbuzz',
    title:'Mission 6: The FizzBuzz Interview',
    desc:'<div style="font-size:10px;line-height:1.6;color:var(--fg);margin-bottom:8px"><b>🎯 Objective:</b> Implement the classic FizzBuzz test.<br><br><b>📖 Background:</b> FizzBuzz is THE most famous coding interview question. It filters out candidates who can\'t write basic logic. The rules: if a number is divisible by 3, say "Fizz". If divisible by 5, say "Buzz". If divisible by both, say "FizzBuzz". Otherwise, just say the number.<br><br><b>🧠 Key Concept:</b> Check the MOST specific condition first (divisible by both = divisible by 15). Then check less specific conditions. This is called "ordering your conditions."</div>',
    template:'def fizzbuzz(n):\n    # n is a positive integer\n    # Return "Fizz" if divisible by 3\n    # Return "Buzz" if divisible by 5\n    # Return "FizzBuzz" if divisible by both\n    # Otherwise return n as a string\n    # IMPORTANT: Check divisible by 15 FIRST\n    pass',
    tests:[['fizzbuzz(3)', 'Fizz'],['fizzbuzz(5)', 'Buzz'],['fizzbuzz(15)', 'FizzBuzz'],['fizzbuzz(7)', '7']],
    hints:['Check the most specific case first: divisible by both 3 AND 5 means divisible by 15.','Use modulo: if n % 15 == 0 return "FizzBuzz", elif n % 3 == 0 return "Fizz", elif n % 5 == 0 return "Buzz".','Convert n to string for the else: return str(n)']
  },
  {
    id:'count-vowels',
    title:'Mission 7: Vowel Counter',
    desc:'<div style="font-size:10px;line-height:1.6;color:var(--fg);margin-bottom:8px"><b>🎯 Objective:</b> Count how many vowels are in a string.<br><br><b>📖 Background:</b> Text analysis is everywhere — search engines, spell checkers, autocomplete. Counting characters is the first step. Vowels (a, e, i, o, u) are the most common letters in English. Your function should be case-insensitive (treat \'A\' and \'a\' the same).<br><br><b>🧠 Key Concept:</b> Convert to lowercase first (<code>s.lower()</code>), then loop through each character checking if it\'s in a set of vowels.</div>',
    template:'def count_vowels(s):\n    # s is any string (may contain uppercase)\n    # Count and return the number of vowels (a, e, i, o, u)\n    # Make it case-insensitive!\n    pass',
    tests:[['count_vowels("hello")', '2'],['count_vowels("AEIOU")', '5'],['count_vowels("sky")', '0'],['count_vowels("Python")', '1']],
    hints:['Convert to lowercase first: s = s.lower()','Check each character: if c in "aeiou": count += 1','return sum(1 for c in s.lower() if c in "aeiou")']
  },
  {
    id:'fibonacci',
    title:'Mission 8: The Golden Sequence',
    desc:'<div style="font-size:10px;line-height:1.6;color:var(--fg);margin-bottom:8px"><b>🎯 Objective:</b> Generate the first n Fibonacci numbers.<br><br><b>📖 Background:</b> The Fibonacci sequence appears everywhere in nature — flower petals, pinecones, spiral galaxies. Each number is the sum of the previous two: 0, 1, 1, 2, 3, 5, 8, 13, 21... It starts with 0 and 1. This sequence is used in algorithms, trading strategies, and even art.<br><br><b>🧠 Key Concept:</b> Build the list step by step. Always look at the last two numbers to generate the next one.</div>',
    template:'def fib_list(n):\n    # n is how many Fibonacci numbers to generate\n    # Return a list of the first n Fibonacci numbers\n    # fib(1) = [0], fib(2) = [0, 1], fib(5) = [0, 1, 1, 2, 3]\n    pass',
    tests:[['fib_list(1)', '[0]'],['fib_list(2)', '[0, 1]'],['fib_list(5)', '[0, 1, 1, 2, 3]'],['fib_list(7)', '[0, 1, 1, 2, 3, 5, 8]']],
    hints:['Start the list with [0, 1]. Each new number is the sum of the last two.','Use a loop: while len(result) < n: result.append(result[-1] + result[-2])','Edge case: if n == 1, return [0]; if n == 0, return []']
  },
  {
    id:'reverse-string',
    title:'Mission 9: String Reverser',
    desc:'<div style="font-size:10px;line-height:1.6;color:var(--fg);margin-bottom:8px"><b>🎯 Objective:</b> Reverse any string completely.<br><br><b>📖 Background:</b> String reversal is a fundamental operation. It\'s used in DNA sequencing, cryptography, and checksums. Understanding string slicing is a Python superpower — once you know <code>[start:stop:step]</code>, you can extract any part of any sequence.<br><br><b>🧠 Key Concept:</b> A negative step in a slice walks backwards. <code>s[::-1]</code> means "from start to end, step -1" — which reverses the string.</div>',
    template:'def reverse_string(s):\n    # s is any string\n    # Return s reversed (e.g., "hello" -> "olleh")\n    # Python makes this very easy!\n    pass',
    tests:[['reverse_string("hello")', 'olleh'],['reverse_string("Python")', 'nohtyP'],['reverse_string("a")', 'a'],['reverse_string("racecar")', 'racecar']],
    hints:['Python slices can take a step parameter.','s[::-1] means "step by -1" which goes backward.','return s[::-1]']
  },
  {
    id:'temperature',
    title:'Mission 10: Global Weather',
    desc:'<div style="font-size:10px;line-height:1.6;color:var(--fg);margin-bottom:8px"><b>🎯 Objective:</b> Convert Celsius to Fahrenheit.<br><br><b>📖 Background:</b> Most of the world uses Celsius, but the US uses Fahrenheit. Temperature conversion is one of the most practical programming tasks. The formula is: F = (C × 9/5) + 32. That\'s it! This teaches you about mathematical operations in Python and function return values.<br><br><b>🧠 Key Concept:</b> Python follows order of operations (multiplication before addition), so C × 9/5 + 32 is calculated correctly without extra parentheses. But adding parentheses makes it clearer: (C * 9/5) + 32.</div>',
    template:'def c_to_f(c):\n    # c is temperature in Celsius\n    # Convert to Fahrenheit: F = (C × 9/5) + 32\n    # Return the result\n    pass',
    tests:[['c_to_f(0)', '32.0'],['c_to_f(100)', '212.0'],['c_to_f(-40)', '-40.0'],['c_to_f(37)', '98.6']],
    hints:['The formula is: multiply by 9, divide by 5, add 32.','return c * 9 / 5 + 32','Test it: water freezes at 0°C = 32°F, boils at 100°C = 212°F']
  }
];

function clInitChallenges() {
  var listEl = document.getElementById('cl-challenges-list');
  if (!listEl) return;
  var html = '';
  CODECHALLENGES.forEach(function(c) {
    html += '<div style="padding:6px 8px;border-bottom:1px solid var(--border);cursor:pointer" onclick="clLoadChallenge(\'' + c.id + '\')"><div style="font-size:11px;color:var(--fg)">' + escapeHtml(c.title) + '</div></div>';
  });
  listEl.innerHTML = html || '<div style="color:var(--fg-dim);font-size:10px;padding:8px">No challenges loaded.</div>';
}

function clLoadChallenge(id) {
  var c = null;
  for (var i = 0; i < CODECHALLENGES.length; i++) { if (CODECHALLENGES[i].id === id) { c = CODECHALLENGES[i]; break; } }
  if (!c) return;
  var descEl = document.getElementById('cl-challenge-desc');
  if (descEl) descEl.innerHTML = '<div style="font-size:12px;color:var(--fg);font-weight:bold;margin-bottom:4px">' + escapeHtml(c.title) + '</div>' + c.desc;
  var viewEl = document.getElementById('cl-challenge-view');
  var hintHtml = '';
  if (c.hints && c.hints.length) {
    hintHtml = '<div id="cl-hint-box" style="margin-top:8px"><button class="nt-btn" onclick="clShowHint()" id="cl-hint-btn" style="font-size:10px">💡 Need a hint?</button><div id="cl-hint-text" style="display:none;font-size:10px;color:var(--amber);margin-top:6px;padding:8px;background:rgba(255,183,77,0.08);border-left:2px solid var(--amber);border-radius:3px"></div></div>';
  }
  if (viewEl) viewEl.innerHTML = '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px;font-size:10px;color:var(--fg);margin:0">' + escapeHtml(c.template) + '</pre>' + hintHtml;
  var editor = document.getElementById('cl-code-input');
  if (editor) editor.value = c.template;
  window._clChallenge = c;
  window._clHintLevel = 0;
  var guideEl = document.getElementById('cl-guide-view');
  var dictEl = document.getElementById('cl-dict-view');
  var projectEl = document.getElementById('cl-project-view');
  if (guideEl) guideEl.style.display = 'none';
  if (dictEl) dictEl.style.display = 'none';
  if (projectEl) projectEl.style.display = 'none';
  if (viewEl) viewEl.style.display = 'block';
  if (descEl) descEl.style.display = 'block';
  var listEl = document.getElementById('cl-challenges-list');
  if (listEl) listEl.style.display = 'block';
}

function clShowHint() {
  var c = window._clChallenge;
  if (!c || !c.hints) return;
  var level = window._clHintLevel || 0;
  var hintText = document.getElementById('cl-hint-text');
  var hintBtn = document.getElementById('cl-hint-btn');
  if (level < c.hints.length) {
    if (hintText) { hintText.style.display = 'block'; hintText.textContent = 'Hint ' + (level+1) + ': ' + c.hints[level]; }
    window._clHintLevel = (level + 1);
    if (hintBtn && window._clHintLevel >= c.hints.length) hintBtn.textContent = '💡 No more hints!';
    else if (hintBtn) hintBtn.textContent = '💡 Need another hint? (' + (c.hints.length - window._clHintLevel) + ' left)';
  }
}

function clBackToChallenges() {
  var viewEl = document.getElementById('cl-challenge-view');
  var descEl = document.getElementById('cl-challenge-desc');
  var listEl = document.getElementById('cl-challenges-list');
  if (viewEl) viewEl.style.display = 'none';
  if (descEl) descEl.style.display = 'none';
  if (listEl) listEl.style.display = 'block';
  window._clChallenge = null;
}

function clGradeChallenge() {
  var c = window._clChallenge;
  if (!c) return;
  var editor = document.getElementById('cl-code-input');
  if (!editor) return;
  var code = editor.value;
  var tests = c.tests;
  var testCode = code + '\n\n# test runner\n';
  for (var i = 0; i < tests.length; i++) {
    var expr = tests[i][0];
    var expected = tests[i][1];
    testCode += 'try:\n    __r = ' + expr + '\n    __e = ' + expected + '\n    __ok = str(__r) == str(__e)\n    print("TEST ' + (i+1) + ': " + ("PASS" if __ok else "FAIL") + " (got " + repr(__r) + ", want " + repr(__e) + ")")\nexcept Exception as __x:\n    print("TEST ' + (i+1) + ': ERROR - " + str(__x))\n';
  }
  var output = document.getElementById('cl-output');
  if (!output) return;
  output.innerHTML = '<div style="color:var(--fg-dim);font-size:11px">Running tests...</div>';
  fetch('/api/code/run', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:testCode,language:'python'})})
  .then(function(r){return r.json();})
  .then(function(d){
    var html='';var passed=0;
    (d.stdout||'').split('\n').forEach(function(line){
      if(line.indexOf('PASS')!==-1){html+='<div style="color:var(--teal);font-size:11px">'+escapeHtml(line)+'</div>';passed++;}
      else if(line.indexOf('FAIL')!==-1||line.indexOf('ERROR')!==-1){html+='<div style="color:var(--amber);font-size:11px">'+escapeHtml(line)+'</div>';}
    });
    if(d.stderr)html+='<div style="color:var(--amber);font-size:10px">'+escapeHtml(d.stderr)+'</div>';
    html+='<div style="margin-top:6px;font-size:12px;font-weight:bold;color:'+(passed===tests.length?'var(--teal)':'var(--amber)')+'">Score: '+passed+'/'+tests.length+'</div>';
    if(passed===tests.length)html+='<div style="color:var(--teal);font-size:11px">All tests passed!</div>';
    output.innerHTML=html;
  }).catch(function(e){output.innerHTML='<div style="color:var(--red);font-size:11px">Error: '+escapeHtml(e.message)+'</div>';});
}

var CL_SNIPPETS = {
  'function': 'def my_function(param):\n    pass\n',
  'class': 'class MyClass:\n    def __init__(self):\n        pass\n',
  'loop': 'for item in collection:\n    print(item)\n',
  'if': 'if condition:\n    pass\nelse:\n    pass\n',
  'try': 'try:\n    pass\nexcept Exception as e:\n    print(e)\n',
  'listcomp': '[x for x in range(10)]\n',
  'fstring': 'f"Hello, {name}!"\n',
};

function initCodeLab() {
  var editor = $('cl-code-input');
  if (editor) {
    editor.placeholder = '# Write your code here...\n# Select a language and click Run';
  }
  currentClLang = 'python';
  var langSelect = $('cl-lang-select');
  if (langSelect) langSelect.value = 'python';
  clRenderGuides();
  clSearchDict();
  clRenderProjects();
  clInitChallenges();
}

function clSwitchTab(tab) {
  currentClTab = tab;
  // Hide all content panels
  ['guides','dictionary','projects','challenges'].forEach(function(t) {
    var c = $('cl-' + t);
    if (c) c.style.display = 'none';
  });
  // Show the selected one
  var active = $('cl-' + tab);
  if (active) active.style.display = 'block';
  // Toggle button active states
  qsa('.cl-sb-btn').forEach(function(b) {
    var ontxt = b.getAttribute('onclick') || '';
    b.classList.toggle('active', ontxt.indexOf("'" + tab + "'") !== -1);
  });
  // Lazy-init challenges
  if (tab === 'challenges' && !window._clChallengesInit) {
    clInitChallenges();
    window._clChallengesInit = true;
  }
}

function clLoadGuide(id) {
  var guide = null;
  for (var i = 0; i < CODEGUIDES.length; i++) {
    if (CODEGUIDES[i].id === id) { guide = CODEGUIDES[i]; break; }
  }
  if (!guide) return;

  window._clGuide = guide;
  window._clGuideStep = 0;

  var viewEl = $('cl-guide-view');
  var listEl = $('cl-guides-list');
  if (viewEl) viewEl.style.display = 'block';
  if (listEl) listEl.style.display = 'none';

  if (guide.steps && guide.steps.length) {
    clRenderGuideStep();
  } else {
    var contentEl = $('cl-guide-content');
    if (contentEl) contentEl.innerHTML = '<h2 style="color:var(--cyan);margin:0 0 12px;font-size:15px">' + escapeHtml(guide.title) + '</h2>'
      + '<div style="font-size:10px;color:var(--teal);margin-bottom:12px">' + escapeHtml(guide.category) + '</div>'
      + guide.content;
    var editor = $('cl-code-input');
    if (editor) editor.value = '# ' + guide.title + '\n# Write your code here\n';
    // Back only button
    var navArea = document.getElementById('cl-guide-nav');
    if (navArea) navArea.innerHTML = '';
  }
}

function clRenderGuideStep() {
  var guide = window._clGuide;
  var step = window._clGuideStep || 0;
  var s = guide.steps[step];
  if (!s) return;

  var title = guide.title;
  var editor = $('cl-code-input');
  if (editor) editor.value = s.code || '# Write your code here\n';

  var html = '';
  html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">';
  html += '<h2 style="color:var(--cyan);margin:0;font-size:15px;flex:1">' + escapeHtml(title) + '</h2>';
  html += '<span style="font-size:11px;color:var(--fg-dim);white-space:nowrap">Step ' + (step+1) + ' of ' + guide.steps.length + '</span>';
  html += '</div>';
  html += '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">' + escapeHtml(s.title) + '</h4>';
  html += '<p style="color:var(--fg);font-size:11px;line-height:1.7;margin:0 0 12px">' + s.text + '</p>';

  if (s.try) {
    html += '<div style="background:rgba(79,195,247,0.08);border:1px solid var(--cyan);border-radius:4px;padding:10px;margin:8px 0">';
    html += '<p style="margin:0 0 6px;font-size:11px;color:var(--cyan);font-weight:bold">🎯 Try It!</p>';
    html += '<p style="margin:0 0 8px;font-size:11px;color:var(--fg)">' + s.try + '</p>';
    if (s.solution) {
      html += '<button class="nt-btn" onclick="clShowSolution()" id="cl-soln-btn" style="font-size:10px">💡 Show Solution</button>';
      html += '<pre id="cl-soln-code" style="display:none;background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px;margin:8px 0 0;font-size:10px;color:var(--teal);overflow-x:auto">' + escapeHtml(s.solution) + '</pre>';
    }
    html += '</div>';
  }

  var contentEl = $('cl-guide-content');
  if (contentEl) contentEl.innerHTML = html;

  // Navigation
  var nav = document.getElementById('cl-guide-nav');
  if (nav) {
    var navHtml = '';
    navHtml += '<button class="nt-btn" onclick="clBackToGuides()" style="font-size:10px;margin-right:8px">← All Guides</button>';
    if (step > 0) {
      navHtml += '<button class="nt-btn" onclick="clGuidePrev()" style="font-size:10px">← Back</button>';
    }
    if (step < guide.steps.length - 1) {
      navHtml += '<button class="nt-btn" onclick="clGuideNext()" style="font-size:10px;color:var(--teal);margin-left:4px">Next →</button>';
    } else {
      navHtml += '<span style="font-size:11px;color:var(--teal);margin-left:8px">✅ Complete! Try the challenges.</span>';
    }
    nav.innerHTML = navHtml;
  }
}

function clGuideNext() {
  var guide = window._clGuide;
  if (!guide || !guide.steps) return;
  window._clGuideStep = Math.min(guide.steps.length - 1, (window._clGuideStep || 0) + 1);
  clRenderGuideStep();
}

function clGuidePrev() {
  window._clGuideStep = Math.max(0, (window._clGuideStep || 0) - 1);
  clRenderGuideStep();
}

function clShowSolution() {
  var code = document.getElementById('cl-soln-code');
  var btn = document.getElementById('cl-soln-btn');
  if (code) code.style.display = 'block';
  if (btn) btn.style.display = 'none';
    var editor = $('cl-code-input');
    if (editor && code) editor.value = code.textContent;
}

function clBackToGuides() {
  var viewEl = $('cl-guide-view');
  var listEl = $('cl-guides-list');
  if (viewEl) viewEl.style.display = 'none';
  if (listEl) listEl.style.display = 'block';
  window._clGuide = null;
}

function clRenderGuides() {
  var container = $('cl-guides-list');
  if (!container) return;

  var categories = {};
  CODEGUIDES.forEach(function(g) {
    if (!categories[g.category]) categories[g.category] = [];
    categories[g.category].push(g);
  });

  var html = '';
  var catKeys = Object.keys(categories).sort();
  catKeys.forEach(function(cat) {
    html += '<div style="margin-bottom:14px">';
    html += '<div style="font-size:10px;color:var(--teal);font-weight:600;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px">' + escapeHtml(cat) + '</div>';
    categories[cat].forEach(function(g) {
      html += '<div class="cl-guide-item" onclick="clLoadGuide(\'' + g.id + '\')" style="padding:8px 10px;cursor:pointer;border-radius:4px;background:var(--bg2);border:1px solid var(--border);margin-bottom:4px;transition:border-color 0.15s">'
        + '<div style="font-size:11px;color:var(--fg)">' + escapeHtml(g.title) + '</div>'
        + '</div>';
    });
    html += '</div>';
  });

  container.innerHTML = html;
}

function clSearchDict() {
  var input = $('cl-dict-search');
  if (!input) return;
  var query = input.value.toLowerCase().trim();
  if (!query) {
    clRenderDict(CODEDICT.slice(0, 20));
    return;
  }
  var results = CODEDICT.filter(function(e) {
    return e.term.toLowerCase().indexOf(query) !== -1 || e.definition.toLowerCase().indexOf(query) !== -1;
  });
  clRenderDict(results);
}

function clRenderDict(entries) {
  var container = $('cl-dict-results');
  if (!container) return;
  if (!entries || !entries.length) {
    container.innerHTML = '<div style="color:var(--fg-dim);font-size:11px;padding:12px">No results found.</div>';
    return;
  }
  var html = '<div style="font-size:10px;color:var(--fg-dim);margin-bottom:8px">' + entries.length + ' term' + (entries.length !== 1 ? 's' : '') + '</div>';
  entries.forEach(function(e) {
    html += '<div class="cl-dict-entry" style="padding:8px 10px;background:var(--bg2);border:1px solid var(--border);border-radius:4px;margin-bottom:4px">'
      + '<div style="font-size:11px;color:var(--cyan);font-weight:600;margin-bottom:2px">' + escapeHtml(e.term) + '</div>'
      + '<div style="font-size:10px;color:var(--fg-dim);line-height:1.5">' + escapeHtml(e.definition) + '</div>'
      + '</div>';
  });
  container.innerHTML = html;
}

function clRenderProjects() {
  var container = $('cl-projects-list');
  if (!container) return;
  var html = '';
  CODEPROJECTS.forEach(function(p) {
    var diffColor = 'var(--teal)';
    if (p.difficulty === 'Intermediate') diffColor = 'var(--amber)';
    if (p.difficulty === 'Advanced') diffColor = 'var(--red)';
    html += '<div class="cl-project-item" onclick="clLoadProject(\'' + p.id + '\')" style="padding:10px 12px;cursor:pointer;border-radius:4px;background:var(--bg2);border:1px solid var(--border);margin-bottom:6px;transition:border-color 0.15s">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">'
      + '<div style="font-size:11px;color:var(--fg);font-weight:600">' + escapeHtml(p.title) + '</div>'
      + '<span style="font-size:9px;color:' + diffColor + ';background:var(--bg);padding:2px 8px;border-radius:3px;border:1px solid var(--border)">' + escapeHtml(p.difficulty) + '</span>'
      + '</div>'
      + '<div style="font-size:10px;color:var(--fg-dim);line-height:1.5">' + escapeHtml(p.description) + '</div>'
      + '</div>';
  });
  container.innerHTML = html;
}

function clLoadProject(id) {
  var project = null;
  for (var i = 0; i < CODEPROJECTS.length; i++) {
    if (CODEPROJECTS[i].id === id) {
      project = CODEPROJECTS[i];
      break;
    }
  }
  if (!project) return;

  var descEl = $('cl-project-description');
  var viewEl = $('cl-project-view');
  var listEl = $('cl-projects-list');

  if (descEl) {
    var diffColor = 'var(--teal)';
    if (project.difficulty === 'Intermediate') diffColor = 'var(--amber)';
    if (project.difficulty === 'Advanced') diffColor = 'var(--red)';
    descEl.innerHTML = '<h3 style="color:var(--cyan);margin:0 0 8px;font-size:14px">' + escapeHtml(project.title) + '</h3>'
      + '<span style="font-size:9px;color:' + diffColor + ';background:var(--bg);padding:2px 8px;border-radius:3px;border:1px solid var(--border);display:inline-block;margin-bottom:8px">' + escapeHtml(project.difficulty) + '</span>'
      + '<p style="font-size:11px;color:var(--fg-dim);line-height:1.6;margin:0 0 8px">' + escapeHtml(project.description) + '</p>'
      + '<div style="margin-top:8px;padding:8px 10px;background:var(--bg);border:1px solid var(--border);border-radius:4px">'
      + '<div style="font-size:10px;color:var(--cyan);margin-bottom:4px">💡 Hint</div>'
      + '<div style="font-size:10px;color:var(--fg-dim);line-height:1.5">' + escapeHtml(project.hint) + '</div>'
      + '</div>';
  }

  if (viewEl) viewEl.style.display = 'block';
  if (listEl) listEl.style.display = 'none';

  var editor = $('cl-code-input');
  if (editor) {
    editor.value = project.starter || '';
  }
}

function clBackToProjects() {
  var viewEl = $('cl-project-view');
  var listEl = $('cl-projects-list');
  if (viewEl) viewEl.style.display = 'none';
  if (listEl) listEl.style.display = 'block';
}

function clInitChallenges() {
  var listEl = $('cl-challenges-list');
  if (!listEl) return;
  var html = '';
  CODECHALLENGES.forEach(function(c) {
    html += '<div style="padding:6px 8px;border-bottom:1px solid var(--border);cursor:pointer" onclick="clLoadChallenge(\'' + c.id + '\')"><div style="font-size:11px;color:var(--fg)">' + escapeHtml(c.title) + '</div></div>';
  });
  listEl.innerHTML = html || '<div style="color:var(--fg-dim);font-size:10px;padding:8px">No challenges loaded.</div>';
}

function clBackToChallenges() {
  var viewEl = $('cl-challenge-view');
  var descEl = $('cl-challenge-desc');
  var listEl = $('cl-challenges-list');
  if (viewEl) viewEl.style.display = 'none';
  if (descEl) descEl.style.display = 'none';
  if (listEl) listEl.style.display = 'block';
  window._clChallenge = null;
}

function clLoadToEditor() {
  var editor = $('cl-code-input');
  if (!editor) return;
  var viewEl = $('cl-project-content');
  if (!viewEl) return;
  var pre = viewEl.querySelector('pre code');
  if (pre) {
    editor.value = pre.textContent;
    showNotification('Code loaded into editor!', 1500, 'success');
  }
}

function clRunCode() {
  var editor = $('cl-code-input');
  var output = $('cl-output');
  var langSelect = $('cl-lang-select');
  var runBtn = $('cl-run-btn');
  var cancelBtn = $('cl-cancel-btn');

  if (!editor || !output) return;

  var code = editor.value;
  if (!code.trim()) {
    output.innerHTML = '<div style="color:var(--fg-dim);font-size:11px">No code to run.</div>';
    return;
  }

  var lang = langSelect ? langSelect.value : 'python';

  if (lang === 'javascript') {
    clRunJavaScript(code, output);
    return;
  }

  if (runBtn) {
    runBtn.disabled = true;
    runBtn.textContent = 'Running...';
  }
  if (cancelBtn) cancelBtn.style.display = 'inline-block';

  output.innerHTML = '<div style="color:var(--fg-dim);font-size:11px">Running...</div>';

  _clAbortController = new AbortController();

  fetch('/api/code/run', {
    signal: _clAbortController.signal,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({code: code, language: lang})
  })
  .then(function(r) {
    if (!r.ok) throw new Error('Server error: ' + r.status + ' (try reinstalling)');
    return r.json();
  })
  .then(function(data) {
    var html = '';
    if (data.error) {
      html = '<div style="color:var(--red);font-size:11px">' + escapeHtml(data.error) + '</div>';
    } else {
      if (data.stdout) {
        html += '<div style="color:var(--teal);font-size:10px;margin-bottom:4px">▸ stdout</div>'
          + '<pre style="margin:0 0 6px;font-size:11px;color:var(--fg);line-height:1.5;white-space:pre-wrap;word-break:break-word">' + escapeHtml(data.stdout) + '</pre>';
      }
      if (data.stderr) {
        html += '<div style="color:var(--amber);font-size:10px;margin-bottom:4px">▸ stderr</div>'
          + '<pre style="margin:0;font-size:11px;color:var(--amber);line-height:1.5;white-space:pre-wrap;word-break:break-word">' + escapeHtml(data.stderr) + '</pre>';
      }
      if (!data.stdout && !data.stderr) {
        html = '<div style="color:var(--fg-dim);font-size:11px">✓ Done (no output)</div>';
      } else if (data.exit_code !== 0) {
        html += '<div style="color:var(--red);font-size:10px;margin-top:4px">Exit code: ' + data.exit_code + '</div>';
      }
    }
    output.innerHTML = html || '<div style="color:var(--fg-dim);font-size:11px">No output</div>';
  })
  .catch(function(err) {
    if (err.name === 'AbortError') {
      output.innerHTML = '<div style="color:var(--fg-dim);font-size:11px">⏹ Execution cancelled.</div>';
    } else {
      output.innerHTML = '<div style="color:var(--red);font-size:11px">Error: ' + escapeHtml(err.message) + '</div>';
    }
  })
  .finally(function() {
    if (runBtn) {
      runBtn.disabled = false;
      runBtn.textContent = '▶ Run';
    }
    if (cancelBtn) cancelBtn.style.display = 'none';
    _clAbortController = null;
  });
}

function clRunJavaScript(code, output) {
  output.innerHTML = '<div style="color:var(--fg-dim);font-size:11px">Running...</div>';
  var logs = [];
  var errors = [];
  var _log = console.log;
  var _error = console.error;
  var _warn = console.warn;
  try {
    console.log = function() { logs.push(Array.prototype.slice.call(arguments).map(function(a) { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }).join(' ')); };
    console.error = function() { errors.push(Array.prototype.slice.call(arguments).join(' ')); };
    console.warn = function() { logs.push('[warn] ' + Array.prototype.slice.call(arguments).join(' ')); };
    var result = eval(code);
    if (result !== undefined) logs.push(String(result));
  } catch(e) {
    errors.push(e.message || String(e));
  } finally {
    console.log = _log;
    console.error = _error;
    console.warn = _warn;
  }
  var html = '';
  if (logs.length) {
    html += '<div style="color:var(--teal);font-size:10px;margin-bottom:4px">▸ output</div>'
      + '<pre style="margin:0 0 6px;font-size:11px;color:var(--fg);line-height:1.5;white-space:pre-wrap;word-break:break-word">' + escapeHtml(logs.join('\n')) + '</pre>';
  }
  if (errors.length) {
    html += '<div style="color:var(--amber);font-size:10px;margin-bottom:4px">▸ error</div>'
      + '<pre style="margin:0;font-size:11px;color:var(--amber);line-height:1.5;white-space:pre-wrap;word-break:break-word">' + escapeHtml(errors.join('\n')) + '</pre>';
  }
  output.innerHTML = html || '<div style="color:var(--fg-dim);font-size:11px">✓ Done (no output)</div>';
}

function clCancelRun() {
  if (_clAbortController) {
    _clAbortController.abort();
  }
  var runBtn = $('cl-run-btn');
  var cancelBtn = $('cl-cancel-btn');
  if (runBtn) { runBtn.disabled = false; runBtn.textContent = '▶ Run'; }
  if (cancelBtn) cancelBtn.style.display = 'none';
}

function clClearOutput() {
  var output = $('cl-output');
  if (output) output.innerHTML = '<div style="color:var(--fg-dim);font-size:11px">Output will appear here...</div>';
}

function clCopyCode() {
  var editor = $('cl-code-input');
  if (!editor || !editor.value) {
    showNotification('Nothing to copy.', 2000, 'error');
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(editor.value).then(function() {
      showNotification('Code copied to clipboard!', 1500, 'success');
    }).catch(function() {
      fallbackCopy(editor.value);
    });
  } else {
    fallbackCopy(editor.value);
  }
}

function fallbackCopy(text) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showNotification('Code copied to clipboard!', 1500, 'success');
  } catch(e) {
    showNotification('Failed to copy.', 2000, 'error');
  }
  document.body.removeChild(textarea);
}

function clInsertSnippet(snippet) {
  var editor = $('cl-code-input');
  if (!editor) return;
  var snippetText = CL_SNIPPETS[snippet];
  if (!snippetText) return;

  var start = editor.selectionStart;
  var end = editor.selectionEnd;
  var before = editor.value.substring(0, start);
  var after = editor.value.substring(end);
  editor.value = before + snippetText + after;

  var newCursor = start + snippetText.length;
  editor.selectionStart = newCursor;
  editor.selectionEnd = newCursor;
  editor.focus();
}

function clFormatCode() {
  var editor = $('cl-code-input');
  if (!editor) return;

  var lines = editor.value.split('\n');
  var formatted = [];
  var indentLevel = 0;
  var INDENT = '    ';

  lines.forEach(function(line, idx) {
    var trimmed = line.trim();
    var stripped = trimmed;

    var dedentNext = false;
    if (/^(return|pass|break|continue|raise|yield)\b/.test(stripped)) {
      dedentNext = true;
    }

    if (stripped.indexOf('}') === 0 || stripped.indexOf(')') === 0 || stripped.indexOf(']') === 0) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    if (/^\s*(except|elif|else|finally)\s*:/.test(stripped)) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    var currentIndent = indentLevel;
    if (stripped === '') {
      formatted.push('');
      return;
    }

    if (dedentNext) {
      currentIndent = Math.max(0, currentIndent - 1);
    }

    formatted.push(INDENT.repeat(currentIndent) + stripped);

    if (trimmed.length > 0) {
      var lastChar = trimmed[trimmed.length - 1];
      if (lastChar === ':') {
        indentLevel += 1;
      }
    }

    var openBraces = (stripped.match(/{/g) || []).length;
    var closeBraces = (stripped.match(/}/g) || []).length;
    indentLevel += openBraces - closeBraces;
    indentLevel = Math.max(0, indentLevel);

    if (trimmed.indexOf('{') === 0 || trimmed.indexOf('(') === 0 || trimmed.indexOf('[') === 0) {
      if (openBraces === 0 && closeBraces === 0) {
        indentLevel += 1;
      }
    }
  });

  editor.value = formatted.join('\n');
  showNotification('Code formatted!', 1500, 'success');
}

function clSetLanguage(lang) {
  currentClLang = lang;
  var langSelect = $('cl-lang-select');
  var langLabel = $('cl-lang-label');
  if (langSelect) langSelect.value = lang;
  if (langLabel) {
    var labels = {python:'Python', javascript:'JavaScript', html:'HTML', css:'CSS'};
    langLabel.textContent = labels[lang] || lang;
  }
}

var CODECHALLENGES = [
  {
    id:'sum-two',
    title:'Sum Two Numbers',
    desc:'Write a function <code>add(a, b)</code> that returns the sum of two numbers.',
    template:'def add(a, b):\n    # Your code here\n    pass',
    tests:[
      ['add(2, 3)', '5'],
      ['add(-1, 1)', '0'],
      ['add(0, 0)', '0'],
      ['add(100, 200)', '300']
    ],
    hint:'Return a + b'
  },
  {
    id:'is-even',
    title:'Is Even?',
    desc:'Write a function <code>is_even(n)</code> that returns <code>True</code> if n is even.',
    template:'def is_even(n):\n    # Your code here\n    pass',
    tests:[['is_even(4)', 'True'], ['is_even(7)', 'False'], ['is_even(0)', 'True'], ['is_even(1)', 'False']],
    hint:'Use the modulo operator %'
  },
  {
    id:'factorial',
    title:'Factorial',
    desc:'Write a function <code>factorial(n)</code> that returns n! (n factorial). n! = n × (n-1) × ... × 1.',
    template:'def factorial(n):\n    # Your code here\n    pass',
    tests:[['factorial(1)', '1'], ['factorial(5)', '120'], ['factorial(0)', '1'], ['factorial(3)', '6']],
    hint:'Use a loop or recursion. 0! = 1'
  },
  {
    id:'count-vowels',
    title:'Count Vowels',
    desc:'Write a function <code>count_vowels(s)</code> that returns the number of vowels in a string.',
    template:'def count_vowels(s):\n    # Your code here\n    pass',
    tests:[['count_vowels("hello")', '2'], ['count_vowels("sky")', '0'], ['count_vowels("AEIOU")', '5'], ['count_vowels("python")', '1']],
    hint:'Convert to lowercase, check each character'
  },
  {
    id:'max-of-three',
    title:'Max of Three',
    desc:'Write a function <code>max_of_three(a, b, c)</code> that returns the largest of three numbers.',
    template:'def max_of_three(a, b, c):\n    # Your code here\n    pass',
    tests:[['max_of_three(1, 2, 3)', '3'], ['max_of_three(5, 3, 4)', '5'], ['max_of_three(-1, -2, -3)', '-1'], ['max_of_three(7, 7, 1)', '7']],
    hint:'Use if/elif or max()'
  },
  {
    id:'palindrome',
    title:'Palindrome Check',
    desc:'Write a function <code>is_palindrome(s)</code> that returns <code>True</code> if s reads the same forwards and backwards.',
    template:'def is_palindrome(s):\n    # Your code here\n    pass',
    tests:[['is_palindrome("racecar")', 'True'], ['is_palindrome("hello")', 'False'], ['is_palindrome("madam")', 'True'], ['is_palindrome("a")', 'True']],
    hint:'Compare s with s[::-1] (reversed string)'
  },
  {
    id:'fizzbuzz',
    title:'FizzBuzz',
    desc:'Write <code>fizzbuzz(n)</code>. Return "Fizz" if divisible by 3, "Buzz" if by 5, "FizzBuzz" if both, else n as string.',
    template:'def fizzbuzz(n):\n    # Your code here\n    pass',
    tests:[['fizzbuzz(3)', 'Fizz'], ['fizzbuzz(5)', 'Buzz'], ['fizzbuzz(15)', 'FizzBuzz'], ['fizzbuzz(7)', '7']],
    hint:'Check divisible by 15 first, then 3, then 5'
  },
  {
    id:'fibonacci',
    title:'Fibonacci List',
    desc:'Write <code>fib_list(n)</code> that returns the first n Fibonacci numbers as a list.',
    template:'def fib_list(n):\n    # Your code here\n    pass',
    tests:[['fib_list(1)', '[0]'], ['fib_list(5)', '[0, 1, 1, 2, 3]'], ['fib_list(2)', '[0, 1]'], ['fib_list(7)', '[0, 1, 1, 2, 3, 5, 8]']],
    hint:'Start with [0, 1], keep adding sum of last two'
  }
];

function clLoadChallenge(id) {
  var c = null;
  for (var i = 0; i < CODECHALLENGES.length; i++) {
    if (CODECHALLENGES[i].id === id) { c = CODECHALLENGES[i]; break; }
  }
  if (!c) return;
  var descEl = $('cl-challenge-desc');
  if (descEl) descEl.innerHTML = '<div style="font-size:12px;color:var(--fg);font-weight:bold;margin-bottom:4px">' + escapeHtml(c.title) + '</div><div style="font-size:10px;color:var(--fg-dim);margin-bottom:8px">' + c.desc + '</div>';
  var viewEl = $('cl-challenge-view');
  if (viewEl) viewEl.innerHTML = '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px;font-size:10px;color:var(--fg);margin:0">' + escapeHtml(c.template) + '</pre>';
  var editor = $('cl-code-input');
  if (editor) editor.value = c.template;
  window._clChallenge = c;
  var guideEl = $('cl-guide-view');
  var dictEl = $('cl-dict-view');
  var projectEl = $('cl-project-view');
  var listEl = $('cl-challenges-list');
  var challengeView = $('cl-challenge-view');
  var challengeDesc = $('cl-challenge-desc');
  if (listEl) listEl.style.display = 'block';
  if (guideEl) guideEl.style.display = 'none';
  if (dictEl) dictEl.style.display = 'none';
  if (projectEl) projectEl.style.display = 'none';
  if (challengeView) challengeView.style.display = 'block';
  if (challengeDesc) challengeDesc.style.display = 'block';
  showNotification('Challenge: ' + c.title, 2000, 'info');
}

function clGradeChallenge() {
  var c = window._clChallenge;
  if (!c) { showNotification('Load a challenge first!', 2000, 'error'); return; }
  var editor = $('cl-code-input');
  if (!editor) return;
  var code = editor.value;
  var tests = c.tests;
  var testCode = code + '\n\n# test runner\n';
  for (var i = 0; i < tests.length; i++) {
    var expr = tests[i][0];
    var expected = tests[i][1];
    testCode += 'try:\n';
    testCode += '    __r = ' + expr + '\n';
    testCode += '    __e = ' + expected + '\n';
    testCode += '    __ok = str(__r) == str(__e)\n';
    testCode += '    print("TEST ' + (i+1) + ': " + ("PASS" if __ok else "FAIL") + " (got " + repr(__r) + ", want " + repr(__e) + ")")\n';
    testCode += 'except Exception as __x:\n';
    testCode += '    print("TEST ' + (i+1) + ': ERROR - " + str(__x))\n';
  }
  var output = $('cl-output');
  if (!output) return;
  output.innerHTML = '<div style="color:var(--fg-dim);font-size:11px">Running tests...</div>';
  fetch('/api/code/run', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({code: testCode, language: 'python'})
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    var html = '';
    var passed = 0;
    var lines = (d.stdout || '').split('\n');
    lines.forEach(function(line) {
      if (line.indexOf('✅') !== -1) { html += '<div style="color:var(--teal);font-size:11px;padding:2px 0">' + escapeHtml(line) + '</div>'; passed++; }
      else if (line.indexOf('❌') !== -1) { html += '<div style="color:var(--amber);font-size:11px;padding:2px 0">' + escapeHtml(line) + '</div>'; }
    });
    if (d.stderr) html += '<div style="color:var(--amber);font-size:10px;margin-top:4px">' + escapeHtml(d.stderr) + '</div>';
    html += '<div style="margin-top:6px;font-size:12px;font-weight:bold;color:' + (passed === tests.length ? 'var(--teal)' : 'var(--amber)') + '">Score: ' + passed + '/' + tests.length + '</div>';
    if (passed === tests.length) html += '<div style="color:var(--teal);font-size:11px">🎉 All tests passed!</div>';
    output.innerHTML = html;
  })
  .catch(function(e) {
    output.innerHTML = '<div style="color:var(--red);font-size:11px">Error: ' + escapeHtml(e.message) + '</div>';
  });
}
