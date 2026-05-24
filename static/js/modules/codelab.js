// Code Lab — Interactive Code Learning Environment

var currentClTab = 'guides';
var currentClLang = 'python';

var CODEGUIDES = [
  {
    id:'python-intro',
    title:'Python Basics',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Welcome to Python!</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Python is a high-level, interpreted programming language known for its readability and simplicity. Created by Guido van Rossum and first released in 1991, Python emphasizes code readability through significant whitespace and a clean syntax. It is widely used in web development, data science, artificial intelligence, scientific computing, and automation. Python follows a philosophy summarized in the Zen of Python: "Beautiful is better than ugly. Explicit is better than implicit. Simple is better than complex."</p>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Python uses dynamic typing, meaning you don\'t need to declare variable types explicitly — the interpreter infers them at runtime. This makes Python very forgiving for beginners while still being powerful enough for professional-grade applications. Python\'s extensive standard library provides modules for everything from file I/O to web services.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Installing Python</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Download Python from python.org (version 3.x recommended). Installers are available for Windows, macOS, and Linux. During installation on Windows, make sure to check "Add Python to PATH". Verify your installation by opening a terminal and typing:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">python --version</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Your First Program</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">The classic first program prints "Hello, World!" to the console. In Python, this is just one line:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">print("Hello, World!")</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">The <code>print()</code> function outputs text to the console. You can pass strings (text in quotes), numbers, variables, or expressions to it. Python automatically converts non-string values to strings for display.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Comments</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Use the <code>#</code> symbol to write comments that Python ignores. Comments help explain your code:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># This is a comment\nprint("Hello!")  # Inline comment</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Basic Math</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python can do arithmetic right in the console or in scripts:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">print(2 + 3)   # 5\nprint(10 - 4)  # 6\nprint(3 * 7)   # 21\nprint(15 / 4)  # 3.75\nprint(15 // 4) # 3 (floor division)\nprint(15 % 4)  # 3 (modulus)\nprint(2 ** 3)  # 8 (exponent)</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Python follows standard operator precedence: multiplication and division happen before addition and subtraction. Use parentheses to control order: <code>(2 + 3) * 4</code> equals 20, while <code>2 + 3 * 4</code> equals 14.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Getting Help</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Use Python\'s built-in <code>help()</code> function to learn about any function or module. For quick reference, <code>dir()</code> lists all attributes of an object:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">help(print)\ndir(str)</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Python\'s interactive shell (REPL) is a great way to experiment. Just type <code>python</code> in your terminal to start it.</p>'
  },
  {
    id:'python-vars',
    title:'Variables & Types',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Variables and Data Types</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Variables are named containers that store data in memory. In Python, you create a variable by assigning a value to a name using the equals sign <code>=</code>. Unlike many other languages, Python variables don\'t need explicit type declarations — the interpreter infers the type from the value you assign.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">name = "Alice"\nage = 25\nheight = 5.6\nis_student = True</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Variable Naming Rules</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Variable names must start with a letter or underscore, followed by letters, digits, or underscores. They are case-sensitive (<code>age</code> and <code>Age</code> are different). Avoid using Python keywords like <code>if</code>, <code>else</code>, <code>while</code>, <code>for</code>, <code>class</code>, <code>def</code>, <code>import</code>, and <code>return</code> as variable names.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">valid_name = "ok"\n_validName = "also ok"\nname123 = "fine"\n123name = "not allowed"  # SyntaxError!</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Basic Data Types</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python has several built-in types. <code>int</code> is for whole numbers (positive, negative, or zero). <code>float</code> is for decimal numbers. <code>str</code> is for text (strings). <code>bool</code> is for boolean values <code>True</code> or <code>False</code>. <code>NoneType</code> represents the absence of a value (<code>None</code>).</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">x = 42          # int\ny = 3.14        # float\nz = "Hello"     # str\nflag = False    # bool\nnothing = None  # NoneType\n\nprint(type(x))  # <class \'int\'></code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Type Conversion</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">You can convert between types using built-in functions like <code>int()</code>, <code>float()</code>, <code>str()</code>, and <code>bool()</code>:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">age_str = "25"\nage_int = int(age_str)      # 25\npi = 3.14159\npi_str = str(pi)            # "3.14159"\nnum = float("10.5")        # 10.5\nprint(bool(0))             # False\nprint(bool(1))             # True\nprint(bool(""))            # False\nprint(bool("hello"))       # True</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Multiple Assignment</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python lets you assign multiple variables in one line:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">a, b, c = 1, 2, 3\n# Swap values without a temp variable\na, b = b, a  # a=2, b=1\n\n# Same value to multiple variables\nx = y = z = 0</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Understanding types is fundamental to Python programming. The <code>type()</code> function is your friend when you need to check what type a variable holds.</p>'
  },
  {
    id:'python-strings',
    title:'Strings & Formatting',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Strings and String Formatting</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Strings are sequences of characters enclosed in single quotes (\') or double quotes ("). Python treats both quote styles the same — just be consistent. Triple quotes (<code>\'\'\'</code> or <code>"""</code>) are used for multi-line strings and docstrings.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">s1 = \'Hello\'\ns2 = "World"\ns3 = \'\'\'This is a\nmulti-line\nstring.\'\'\'</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">String Operations</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Strings support concatenation (<code>+</code>) and repetition (<code>*</code>). You can also check membership with <code>in</code>:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">greeting = "Hello" + " " + "World"  # "Hello World"\nha = "ha" * 3                       # "hahaha"\nprint("ell" in "Hello")            # True</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">String Indexing and Slicing</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">You can access individual characters using square brackets with an index. Python uses zero-based indexing, meaning the first character is at index 0. Negative indices count from the end, starting at -1.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">text = "Python"\nprint(text[0])   # P\nprint(text[-1])  # n\nprint(text[0:3]) # Pyt (slice, start inclusive, end exclusive)\nprint(text[2:])  # thon\nprint(text[:4])  # Pyth\nprint(text[::2]) # Pto (step of 2)\nprint(text[::-1])# nohtyP (reverse)</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Common String Methods</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python strings have many built-in methods. <code>lower()</code> and <code>upper()</code> change case. <code>strip()</code> removes whitespace. <code>split()</code> breaks a string into a list. <code>join()</code> does the reverse. <code>replace()</code> substitutes text.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">s = "  Hello, World!  "\nprint(s.strip())          # "Hello, World!"\nprint(s.lower())          # "  hello, world!  "\nprint(s.upper())          # "  HELLO, WORLD!  "\nprint(s.split(","))       # ["  Hello", " World!  "]\nparts = ["a", "b", "c"]\nprint("-".join(parts))    # "a-b-c"\nprint(s.replace("World", "Python"))  # "  Hello, Python!  "</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">F-Strings (Python 3.6+)</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">F-strings are the modern way to embed expressions inside strings. Prefix the string with <code>f</code> or <code>F</code> and use curly braces to insert variables or expressions:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">name = "Alice"\nage = 25\nprint(f"My name is {name} and I am {age} years old.")\nprint(f"Next year I will be {age + 1}.")\nprint(f"Pi to 3 decimals: {3.14159:.3f}")  # "3.142"</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">F-strings evaluate any Python expression inside the curly braces. You can call functions, do arithmetic, access list items, and more — all inline.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Escape Characters</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Use backslash to include special characters: <code>\\n</code> for newline, <code>\\t</code> for tab, <code>\\\\</code> for a literal backslash, <code>\\\'</code> for a single quote:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">print("Line1\\nLine2")\nprint("Column1\\tColumn2")\nprint(\'It\\\'s nice\')</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Raw strings (<code>r"..."</code>) treat backslashes as literal characters, which is useful for file paths and regular expressions.</p>'
  },
  {
    id:'python-lists',
    title:'Lists & Loops',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Lists and Loops</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Lists are ordered, mutable collections that can hold items of different types. They are one of Python\'s most versatile data structures. Create a list with square brackets, separating items with commas.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">fruits = ["apple", "banana", "cherry"]\nmixed = [1, "hello", 3.14, True]\nempty = []\nnested = [[1, 2], [3, 4]]</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Accessing List Items</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Like strings, lists use zero-based indexing and support negative indices and slicing:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">fruits = ["apple", "banana", "cherry", "date"]\nprint(fruits[0])     # apple\nprint(fruits[-1])    # date\nprint(fruits[1:3])   # ["banana", "cherry"]\nfruits[0] = "avocado"  # modify item</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">List Methods</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Lists have many useful methods: <code>append()</code> adds to the end, <code>insert()</code> adds at a position, <code>remove()</code> deletes by value, <code>pop()</code> removes and returns by index, <code>sort()</code> sorts in place, <code>reverse()</code> reverses, and <code>len()</code> returns the length:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">nums = [3, 1, 4, 1, 5]\nnums.append(9)\nnums.insert(0, 0)   # insert at index 0\nnums.remove(1)      # removes first occurrence of 1\nlast = nums.pop()   # removes and returns 9\nnums.sort()         # [0, 1, 3, 4, 5]\nprint(len(nums))    # 5</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">The For Loop</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">The <code>for</code> loop lets you iterate over any iterable (like a list, string, or range). The loop variable takes each item in sequence:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n\n# Using range() to count\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\n# enumerate() gives index and value\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">While Loop</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">The <code>while</code> loop repeats as long as a condition is true. Be careful to update the condition inside the loop to avoid infinite loops:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">count = 0\nwhile count < 5:\n    print(count)\n    count += 1  # increment\n\n# Break and continue\nfor num in range(10):\n    if num == 3:\n        continue  # skip 3\n    if num == 7:\n        break     # stop at 7\n    print(num)</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">List Comprehensions</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">List comprehensions provide a concise way to create lists. The basic syntax is <code>[expression for item in iterable if condition]</code>:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">squares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]\npairs = [(a, b) for a in [1,2] for b in [3,4]]</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Lists and loops are fundamental to Python programming. Practice combining them to build powerful data processing pipelines.</p>'
  },
  {
    id:'python-dicts',
    title:'Dictionaries & Sets',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Dictionaries and Sets</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Dictionaries (dicts) store key-value pairs. They are unordered (in Python 3.6 and earlier), mutable, and indexed by keys rather than numeric positions. Keys must be immutable types like strings, numbers, or tuples. Create a dict with curly braces and colons separating keys from values.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">person = {\n    "name": "Alice",\n    "age": 25,\n    "city": "New York"\n}\n\n# Accessing values\nprint(person["name"])        # Alice\nprint(person.get("age"))     # 25\nprint(person.get("country", "USA"))  # default value</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Modifying Dictionaries</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Dictionaries are mutable — you can add, update, and delete key-value pairs easily:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">person["email"] = "alice@example.com"  # add new\nperson["age"] = 26                      # update\ndel person["city"]                      # delete\npopped = person.pop("name")             # remove and return\n\n# Check if key exists\nif "email" in person:\n    print(person["email"])</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Dictionary Methods</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Common dict methods include <code>keys()</code>, <code>values()</code>, and <code>items()</code> for iteration:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">for key in person.keys():\n    print(key)\n\nfor value in person.values():\n    print(value)\n\nfor key, value in person.items():\n    print(f"{key}: {value}")</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Sets</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Sets are unordered collections of unique elements. They are useful for removing duplicates and for mathematical set operations like union, intersection, and difference.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">fruits = {"apple", "banana", "cherry", "apple"}\nprint(fruits)  # {"apple", "banana", "cherry"}\n\n# Set operations\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a | b)  # union: {1,2,3,4,5,6}\nprint(a & b)  # intersection: {3,4}\nprint(a - b)  # difference: {1,2}\nprint(a ^ b)  # symmetric difference: {1,2,5,6}</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Set Methods</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Sets have methods like <code>add()</code>, <code>remove()</code>, <code>discard()</code>, <code>pop()</code>, <code>clear()</code>, and <code>update()</code>. <code>add()</code> inserts an element, <code>remove()</code> deletes (raising KeyError if missing), and <code>discard()</code> deletes silently:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">nums = {1, 2, 3}\nnums.add(4)\nnums.discard(2)  # no error if missing\nnums.remove(1)   # raises KeyError if missing\ncopy = nums.copy()</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Dictionary Comprehensions</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Just like list comprehensions, you can create dictionaries concisely:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">squares = {x: x**2 for x in range(5)}\n# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}\n\neven_squares = {x: x**2 for x in range(10) if x % 2 == 0}</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Dictionaries and sets are essential tools for organizing and processing data efficiently. Dictionaries provide O(1) lookup time, making them ideal for fast data retrieval.</p>'
  },
  {
    id:'python-funcs',
    title:'Functions & Scope',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Functions and Scope</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Functions are reusable blocks of code that perform a specific task. They help you organize code, avoid repetition, and make programs more readable. Define a function using the <code>def</code> keyword, followed by the function name, parentheses for parameters, and a colon.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">def greet(name):\n    """Return a greeting message."""\n    return f"Hello, {name}!"\n\nmessage = greet("Alice")\nprint(message)  # Hello, Alice!</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Parameters and Arguments</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Functions can accept parameters and return values. Parameters are the variables listed in the function definition; arguments are the values passed when calling the function. Python supports positional, keyword, default, and variable-length arguments:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Default parameters\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(3))     # 9 (3^2)\nprint(power(3, 3))  # 27 (3^3)\n\n# Keyword arguments\nprint(power(exp=4, base=2))  # 16\n\n# Variable-length arguments\ndef sum_all(*args):\n    return sum(args)\n\ndef print_info(**kwargs):\n    for key, value in kwargs.items():\n        print(f"{key}: {value}")</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Return Values</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Use <code>return</code> to send a value back to the caller. A function without a return statement returns <code>None</code>. You can return multiple values as a tuple:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">def min_max(nums):\n    return min(nums), max(nums)\n\nlow, high = min_max([3, 1, 7, 2, 9])\nprint(low, high)  # 1 9</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Scope</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Variables defined inside a function are local to that function. Variables defined outside all functions are global. Python follows the LEGB rule: Local, Enclosing, Global, Built-in — the interpreter searches these scopes in order when resolving a variable name.</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">x = 10  # global\n\ndef outer():\n    y = 5  # enclosing\n    def inner():\n        z = 1  # local\n        nonlocal y\n        y += z\n        return x + y + z\n    return inner()\n\nprint(outer())  # 17</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Lambda Functions</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Lambda functions are small, anonymous functions defined with the <code>lambda</code> keyword. They can have any number of arguments but only one expression:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">square = lambda x: x**2\nprint(square(5))  # 25\n\n# Often used with map/filter\nnums = [1, 2, 3, 4, 5]\ndoubled = list(map(lambda x: x*2, nums))\nevens = list(filter(lambda x: x % 2 == 0, nums))</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Docstrings</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Always document your functions with docstrings — triple-quoted strings immediately after the function definition. They describe what the function does, its parameters, and its return value:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">def calculate_bmi(weight, height):\n    """\n    Calculate Body Mass Index.\n\n    Args:\n        weight: Weight in kilograms.\n        height: Height in meters.\n\n    Returns:\n        BMI as a float rounded to 1 decimal.\n    """\n    bmi = weight / (height ** 2)\n    return round(bmi, 1)</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Functions are the building blocks of modular code. Mastering them will make your programs cleaner, more maintainable, and easier to debug.</p>'
  },
  {
    id:'python-classes',
    title:'Classes & OOP',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Classes and Object-Oriented Programming</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Object-oriented programming (OOP) organizes code around objects — instances of classes that bundle data (attributes) and behavior (methods). Python supports OOP with classes, inheritance, polymorphism, encapsulation, and abstraction.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Defining a Class</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Use the <code>class</code> keyword to define a class. The <code>__init__</code> method is the constructor, called when you create an instance. The <code>self</code> parameter refers to the instance itself:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def bark(self):\n        return f"{self.name} says Woof!"\n\n    def get_human_years(self):\n        return self.age * 7\n\nmy_dog = Dog("Buddy", 3)\nprint(my_dog.bark())             # Buddy says Woof!\nprint(my_dog.get_human_years())  # 21</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Inheritance</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">A class can inherit attributes and methods from a parent class using the syntax <code>class Child(Parent):</code>. The child can override or extend the parent\'s behavior:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return "..."\n\nclass Cat(Animal):\n    def speak(self):\n        return f"{self.name} says Meow!"\n\nclass Dog(Animal):\n    def speak(self):\n        return f"{self.name} says Woof!"\n\nanimals = [Cat("Whiskers"), Dog("Buddy")]\nfor a in animals:\n    print(a.speak())  # Polymorphism in action</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Encapsulation</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python uses naming conventions for access control. A single underscore prefix (<code>_protected</code>) suggests internal use. A double underscore prefix (<code>__private</code>) triggers name mangling, making it harder (but not impossible) to access from outside:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class BankAccount:\n    def __init__(self, owner, balance):\n        self.owner = owner\n        self.__balance = balance  # private\n\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n\n    def get_balance(self):\n        return self.__balance\n\nacc = BankAccount("Alice", 1000)\nacc.deposit(500)\nprint(acc.get_balance())  # 1500\n# acc.__balance  # AttributeError</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Class Methods and Static Methods</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Use <code>@classmethod</code> for methods that operate on the class itself (receiving <code>cls</code>), and <code>@staticmethod</code> for utility methods that don\'t need instance or class data:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class MathUtils:\n    @staticmethod\n    def add(a, b):\n        return a + b\n\n    @classmethod\n    def create_default(cls):\n        return cls()\n\nprint(MathUtils.add(3, 4))  # 7</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Properties</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">The <code>@property</code> decorator lets you define methods that are accessed like attributes, with getters, setters, and deleters:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n\n    @property\n    def radius(self):\n        return self._radius\n\n    @radius.setter\n    def radius(self, value):\n        if value < 0:\n            raise ValueError("Radius cannot be negative")\n        self._radius = value\n\n    @property\n    def area(self):\n        return 3.14159 * self._radius ** 2</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">OOP helps model real-world entities in code, making complex programs easier to understand and maintain.</p>'
  },
  {
    id:'python-files',
    title:'File I/O',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">File Input/Output</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">File I/O allows your programs to read from and write to files on disk. Python makes file operations simple with built-in functions and the <code>with</code> statement for automatic resource management.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Opening and Closing Files</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Use the <code>open()</code> function to open a file. It returns a file object. Always close files when done — the <code>with</code> statement handles this automatically:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Writing to a file\nwith open("hello.txt", "w") as f:\n    f.write("Hello, World!\\n")\n    f.write("This is a second line.\\n")\n\n# File is automatically closed after the with block</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">File Modes</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">The second argument to <code>open()</code> is the mode: <code>"r"</code> for read (default), <code>"w"</code> for write (overwrites), <code>"a"</code> for append, <code>"x"</code> for exclusive creation (fails if file exists), <code>"b"</code> for binary mode, and <code>"+"</code> for read/write. Combine modes like <code>"rb"</code> or <code>"w+"</code>:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Append to file\nwith open("log.txt", "a") as f:\n    f.write("New log entry\\n")\n\n# Read binary mode\nwith open("image.jpg", "rb") as f:\n    data = f.read()</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Reading Files</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python provides several ways to read file content: <code>read()</code> reads the entire file, <code>readline()</code> reads one line, and <code>readlines()</code> reads all lines into a list:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Read entire file\nwith open("hello.txt", "r") as f:\n    content = f.read()\n\n# Read line by line\nwith open("hello.txt", "r") as f:\n    for line in f:\n        print(line.strip())  # strip removes trailing newline</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Working with Paths</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">The <code>os</code> and <code>pathlib</code> modules help manage file paths. <code>os.path.join()</code> creates platform-appropriate paths, and <code>pathlib.Path</code> provides an object-oriented approach:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">import os\nimport pathlib\n\n# Using os.path\npath = os.path.join("data", "subdir", "file.txt")\nprint(os.path.exists(path))\nprint(os.path.getsize(path))\n\n# Using pathlib (Python 3.4+)\np = pathlib.Path("data/subdir/file.txt")\nprint(p.exists())\nprint(p.suffix)  # .txt\nprint(p.stem)    # file</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">JSON Files</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python\'s <code>json</code> module makes it easy to read and write JSON data — a common format for data exchange:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">import json\n\ndata = {"name": "Alice", "age": 25, "scores": [85, 92, 78]}\n\n# Write JSON\nwith open("data.json", "w") as f:\n    json.dump(data, f, indent=2)\n\n# Read JSON\nwith open("data.json", "r") as f:\n    loaded = json.load(f)\n    print(loaded["name"])  # Alice</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">File I/O is essential for saving program state, reading configuration files, processing data, and exporting results. Always handle file operations with care — use <code>try/except</code> to catch <code>FileNotFoundError</code> and <code>PermissionError</code>.</p>'
  },
  {
    id:'python-errors',
    title:'Error Handling',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Error Handling and Exceptions</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Errors happen in every program. Python uses exceptions to handle errors gracefully. When an error occurs, Python raises an exception that, if not caught, crashes the program. You can catch and handle exceptions using <code>try/except</code> blocks.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Try-Except Basics</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Wrap potentially error-prone code in a <code>try</code> block, and handle errors in one or more <code>except</code> blocks:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">try:\n    num = int(input("Enter a number: "))\n    result = 10 / num\n    print(f"Result: {result}")\nexcept ValueError:\n    print("That was not a valid number!")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\nexcept Exception as e:\n    print(f"Unexpected error: {e}")</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Common Exception Types</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python has many built-in exception types. <code>ValueError</code> for invalid values, <code>TypeError</code> for wrong types, <code>IndexError</code> for invalid list indices, <code>KeyError</code> for missing dictionary keys, <code>FileNotFoundError</code> for missing files, <code>AttributeError</code> for missing attributes, and <code>ImportError</code> for missing modules:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">try:\n    my_list = [1, 2, 3]\n    print(my_list[10])\nexcept IndexError:\n    print("Index out of range!")\n\ntry:\n    my_dict = {"a": 1}\n    print(my_dict["b"])\nexcept KeyError:\n    print("Key not found!")</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Else and Finally</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">An <code>else</code> block runs if no exception occurred. A <code>finally</code> block always runs, whether an exception happened or not — useful for cleanup like closing files:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">try:\n    f = open("file.txt", "r")\n    content = f.read()\nexcept FileNotFoundError:\n    print("File not found!")\nelse:\n    print(f"Read {len(content)} characters")\nfinally:\n    f.close()\n    print("File closed.")</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Raising Exceptions</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">You can raise exceptions intentionally with the <code>raise</code> keyword. This is useful for input validation and signaling error conditions:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">def divide(a, b):\n    if b == 0:\n        raise ValueError("Cannot divide by zero")\n    return a / b\n\ndef set_age(age):\n    if age < 0 or age > 150:\n        raise ValueError(f"Invalid age: {age}")\n    print(f"Age set to {age}")</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Custom Exceptions</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Create custom exception classes by inheriting from <code>Exception</code>:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">class InsufficientFundsError(Exception):\n    pass\n\nclass BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            raise InsufficientFundsError(\n                f"Need {amount - self.balance} more"\n            )\n        self.balance -= amount</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Assertions</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Use <code>assert</code> statements to check conditions that should always be true. They are useful for debugging and testing:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">def calculate_bmi(weight, height):\n    assert weight > 0, "Weight must be positive"\n    assert height > 0, "Height must be positive"\n    return weight / (height ** 2)</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Good error handling makes your programs robust and user-friendly. Always anticipate what could go wrong and handle it gracefully.</p>'
  },
  {
    id:'python-modules',
    title:'Modules & Imports',
    category:'Python',
    content:'<h3 style="color:var(--cyan);margin:0 0 10px;font-size:14px">Modules and Imports</h3>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Modules are Python files containing functions, classes, and variables that you can reuse across multiple programs. Python\'s standard library includes hundreds of modules for everything from math to web development. You can also create your own modules for code organization.</p>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Importing Modules</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Use the <code>import</code> keyword to bring module functionality into your program. You can import entire modules, specific items, or give them aliases:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">import math\nfrom datetime import datetime\nimport numpy as np\nfrom os.path import join, exists\n\nprint(math.pi)                # 3.14159...\nprint(datetime.now())         # current date/time\nprint(join("a", "b", "c"))    # a/b/c</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">The Standard Library</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Python\'s standard library is vast. Key modules include <code>os</code> (operating system interface), <code>sys</code> (system-specific parameters), <code>json</code> (JSON encoding/decoding), <code>re</code> (regular expressions), <code>math</code> (mathematical functions), <code>random</code> (random number generation), <code>datetime</code> (date and time handling), <code>collections</code> (specialized data structures), <code>itertools</code> (iterator functions), and <code>functools</code> (higher-order functions):</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">import random\nfrom collections import Counter, defaultdict\n\nprint(random.randint(1, 10))  # random integer 1-10\n\n# Counter counts hashable items\ncounts = Counter("mississippi")\nprint(counts)  # Counter({\'i\': 4, \'s\': 4, \'p\': 2, \'m\': 1})</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Creating Your Own Module</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">Any <code>.py</code> file is a module. Create a file called <code>mymodule.py</code> with functions, then import it in another script:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># mymodule.py\ndef greet(name):\n    return f"Hello, {name}!"\n\nPI = 3.14159\n\nclass Calculator:\n    @staticmethod\n    def add(a, b):\n        return a + b</code></pre>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># main.py\nimport mymodule\n\nprint(mymodule.greet("Alice"))\nprint(mymodule.PI)\ncalc = mymodule.Calculator()\nprint(calc.add(3, 4))</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Packages</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">A package is a directory containing multiple module files and an <code>__init__.py</code> file (which can be empty). Packages let you organize modules hierarchically:</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)">mypackage/\n  __init__.py\n  math_ops.py\n  string_ops.py\n\n# Usage\nfrom mypackage import math_ops\nfrom mypackage.string_ops import capitalize_all</code></pre>'
      + '<h4 style="color:var(--teal);margin:0 0 8px;font-size:12px">Third-Party Packages (pip)</h4>'
      + '<p style="margin:0 0 8px;color:var(--fg);font-size:11px;line-height:1.7">The Python Package Index (PyPI) hosts hundreds of thousands of third-party packages. Install them with <code>pip install package_name</code>. Popular packages include <code>requests</code> (HTTP), <code>numpy</code> (numerical computing), <code>pandas</code> (data analysis), <code>flask</code> (web framework), <code>django</code> (web framework), <code>beautifulsoup4</code> (web scraping), and <code>matplotlib</code> (plotting):</p>'
      + '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;margin:0 0 10px;overflow-x:auto"><code style="font-size:11px;color:var(--fg)"># Install: pip install requests\nimport requests\n\nresponse = requests.get("https://api.github.com")\nprint(response.status_code)  # 200\nprint(response.json())       # parsed JSON</code></pre>'
      + '<p style="margin:0 0 10px;color:var(--fg);font-size:11px;line-height:1.7">Modules and packages are the backbone of Python code reuse. They keep your code organized and let you leverage the work of millions of developers worldwide.</p>'
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
  { term:'Reduce', definition:'A functools function that repeatedly applies a function to the elements of a sequence, cumulatively combining them into a single value.' }
];

var CODEPROJECTS = [
  {
    id:'hello-world',
    title:'Hello, World!',
    difficulty:'Beginner',
    description:'Write a program that prints a personalized greeting. Ask the user for their name, then print a welcome message.',
    starter:'# Hello, World!\n# Ask the user for their name and print a greeting\n\nname = input("Enter your name: ")\nprint(f"Hello, {name}!")',
    hint:'Use the input() function to get the user\'s name, then use an f-string or concatenation to include it in the greeting.'
  },
  {
    id:'calculator',
    title:'Simple Calculator',
    difficulty:'Beginner',
    description:'Create a calculator that takes two numbers and an operator (+, -, *, /) from the user and displays the result.',
    starter:'# Simple Calculator\n\na = float(input("Enter first number: "))\nop = input("Enter operator (+, -, *, /): ")\nb = float(input("Enter second number: "))\n\nif op == "+":\n    result = a + b\nelif op == "-":\n    result = a - b\nelif op == "*":\n    result = a * b\nelif op == "/":\n    result = a / b\nelse:\n    result = "Invalid operator"\n\nprint(f"Result: {result}")',
    hint:'Use float() to convert input to numbers. Handle division by zero with a try/except block.'
  },
  {
    id:'number-guessing',
    title:'Number Guessing Game',
    difficulty:'Beginner',
    description:'Generate a random number between 1 and 100. Let the user guess, giving hints like "Too high" or "Too low" until they get it right. Show the number of attempts.',
    starter:'# Number Guessing Game\nimport random\n\nsecret = random.randint(1, 100)\nattempts = 0\n\nwhile True:\n    guess = int(input("Guess a number (1-100): "))\n    attempts += 1\n\n    if guess < secret:\n        print("Too low!")\n    elif guess > secret:\n        print("Too high!")\n    else:\n        print(f"Correct! You guessed it in {attempts} tries!")\n        break',
    hint:'Use random.randint(1, 100) to generate the secret number. Use a while True loop with break when guessed correctly.'
  },
  {
    id:'todo-list',
    title:'To-Do List Manager',
    difficulty:'Intermediate',
    description:'Build a command-line to-do list that can add tasks, view all tasks, mark tasks as complete, and delete tasks.',
    starter:'# To-Do List Manager\ntodos = []\n\ndef show_todos():\n    if not todos:\n        print("No tasks yet!")\n        return\n    for i, task in enumerate(todos, 1):\n        status = "✓" if task["done"] else " " \n        print(f"{i}. [{status}] {task[\"title\"]}")\n\ndef add_task(title):\n    todos.append({"title": title, "done": False})\n    print(f"Added: {title}")\n\ndef toggle_task(index):\n    if 0 <= index < len(todos):\n        todos[index]["done"] = not todos[index]["done"]\n\ndef delete_task(index):\n    if 0 <= index < len(todos):\n        removed = todos.pop(index)\n        print(f"Deleted: {removed[\"title\"]}")\n\nwhile True:\n    cmd = input("\\nCommand (add/show/done/delete/quit): ")\n    if cmd == "quit":\n        break\n    elif cmd == "add":\n        add_task(input("Task title: "))\n    elif cmd == "show":\n        show_todos()\n    elif cmd == "done":\n        show_todos()\n        toggle_task(int(input("Task number: ")) - 1)\n    elif cmd == "delete":\n        show_todos()\n        delete_task(int(input("Task number: ")) - 1)',
    hint:'Store tasks as dictionaries with title and done keys. Use enumerate() to display numbered lists.'
  },
  {
    id:'temperature-converter',
    title:'Temperature Converter',
    difficulty:'Beginner',
    description:'Create a program that converts temperatures between Celsius, Fahrenheit, and Kelvin. Let the user choose the conversion direction.',
    starter:'# Temperature Converter\n\ndef celsius_to_fahrenheit(c):\n    return (c * 9/5) + 32\n\ndef fahrenheit_to_celsius(f):\n    return (f - 32) * 5/9\n\ndef celsius_to_kelvin(c):\n    return c + 273.15\n\ndef kelvin_to_celsius(k):\n    return k - 273.15\n\nprint("Temperature Converter")\nprint("1: Celsius to Fahrenheit")\nprint("2: Fahrenheit to Celsius")\nprint("3: Celsius to Kelvin")\nprint("4: Kelvin to Celsius")\n\nchoice = input("Choose conversion (1-4): ")\ntemp = float(input("Enter temperature: "))\n\nif choice == "1":\n    result = celsius_to_fahrenheit(temp)\n    print(f"{temp}°C = {result}°F")\nelif choice == "2":\n    result = fahrenheit_to_celsius(temp)\n    print(f"{temp}°F = {result}°C")\nelif choice == "3":\n    result = celsius_to_kelvin(temp)\n    print(f"{temp}°C = {result}K")\nelif choice == "4":\n    result = kelvin_to_celsius(temp)\n    print(f"{temp}K = {result}°C")\nelse:\n    print("Invalid choice")',
    hint:'Use conversion formulas: C to F = (C × 9/5) + 32, F to C = (F - 32) × 5/9, C to K = C + 273.15.'
  },
  {
    id:'word-counter',
    title:'Word Counter',
    difficulty:'Beginner',
    description:'Write a program that reads a text file or user input and counts the number of words, characters, lines, and the frequency of each word.',
    starter:'# Word Counter\nfrom collections import Counter\n\ntext = input("Enter text (or type FILE:filename): ")\n\nif text.startswith("FILE:"):\n    filename = text[5:]\n    try:\n        with open(filename, "r") as f:\n            text = f.read()\n    except FileNotFoundError:\n        print("File not found!")\n        exit()\n\nwords = text.split()\nchars = len(text)\nlines = text.count("\\n") + 1\n\nprint(f"\\nWords: {len(words)}")\nprint(f"Characters: {chars}")\nprint(f"Lines: {lines}")\nprint(f"Avg word length: {chars / len(words):.1f}")\n\nword_freq = Counter(word.lower().strip(".,!?;:\\\'\\\"") for word in words)\nprint("\\nTop 10 words:")\nfor word, count in word_freq.most_common(10):\n    print(f"  {word}: {count}")',
    hint:'Use the collections.Counter class for word frequency. Strip punctuation from words using strip() with a string of punctuation characters.'
  },
  {
    id:'quiz-game',
    title:'Quiz Game',
    difficulty:'Intermediate',
    description:'Build a multiple-choice quiz game with questions about Python. Keep score, show correct answers, and give a final grade.',
    starter:'# Quiz Game\n\nquestions = [\n    {\n        "question": "What keyword defines a function in Python?",\n        "options": ["func", "def", "define", "lambda"],\n        "answer": 1\n    },\n    {\n        "question": "Which data type is immutable?",\n        "options": ["list", "dict", "tuple", "set"],\n        "answer": 2\n    },\n    {\n        "question": "What does len() return?",\n        "options": ["Type", "Length", "Memory size", "Hash"],\n        "answer": 1\n    }\n]\n\nscore = 0\nfor i, q in enumerate(questions, 1):\n    print(f"\\n{i}. {q[\'question\']}")\n    for j, opt in enumerate(q["options"]):\n        print(f"   {j+1}. {opt}")\n    \n    try:\n        answer = int(input("Your answer (1-4): ")) - 1\n        if answer == q["answer"]:\n            print("✓ Correct!")\n            score += 1\n        else:\n            correct_opt = q["options"][q["answer"]]\n            print(f"✗ Wrong! Answer: {correct_opt}")\n    except:\n        print("Invalid input!")\n\nprint(f"\\nFinal Score: {score}/{len(questions)}")\npercentage = (score / len(questions)) * 100\nprint(f"Grade: {percentage:.0f}%")',
    hint:'Store questions as dictionaries with question, options (list), and answer (index). Use try/except to handle non-numeric input.'
  },
  {
    id:'password-generator',
    title:'Password Generator',
    difficulty:'Beginner',
    description:'Create a program that generates random passwords with customizable length and character types (uppercase, lowercase, digits, symbols).',
    starter:'# Password Generator\nimport random\nimport string\n\ndef generate_password(length=12, use_upper=True, use_lower=True, use_digits=True, use_symbols=True):\n    chars = ""\n    if use_upper:\n        chars += string.ascii_uppercase\n    if use_lower:\n        chars += string.ascii_lowercase\n    if use_digits:\n        chars += string.digits\n    if use_symbols:\n        chars += string.punctuation\n    \n    if not chars:\n        return "Select at least one character type"\n    \n    password = "".join(random.choice(chars) for _ in range(length))\n    return password\n\nprint("Password Generator")\nlength = int(input("Password length (default 12): ") or 12)\n\npassword = generate_password(length)\nprint(f"Generated password: {password}")\nprint(f"Length: {len(password)}")',
    hint:'Use the string module for character sets (ascii_uppercase, ascii_lowercase, digits, punctuation). Use random.choice() in a loop or comprehension.'
  },
  {
    id:'hangman',
    title:'Hangman Game',
    difficulty:'Intermediate',
    description:'Implement the classic Hangman word-guessing game. Choose a random word, display blanks, and let the player guess letters with limited attempts.',
    starter:'# Hangman Game\nimport random\n\nwords = ["python", "programming", "computer", "algorithm", "database", "network", "function", "variable"]\nword = random.choice(words).lower()\nguessed = set()\ntries = 6\n\nwhile tries > 0:\n    display = "".join(c if c in guessed else "_" for c in word)\n    print(f"\\nWord: {display}")\n    print(f"Tries left: {tries}")\n    \n    if "_" not in display:\n        print("🎉 You won!")\n        break\n    \n    guess = input("Guess a letter: ").lower()\n    if len(guess) != 1 or not guess.isalpha():\n        print("Enter a single letter!")\n        continue\n    \n    if guess in guessed:\n        print("Already guessed!")\n        continue\n    \n    guessed.add(guess)\n    if guess not in word:\n        tries -= 1\n        print(f"Wrong! {guess} is not in the word.")\n\nif tries == 0:\n    print(f"\\nGame over! The word was: {word}")',
    hint:'Keep a set of guessed letters. Use a list comprehension with conditional to display underscores for unguessed letters.'
  },
  {
    id:'tic-tac-toe',
    title:'Tic-Tac-Toe',
    difficulty:'Intermediate',
    description:'Build a two-player Tic-Tac-Toe game on the command line. Display the board, alternate turns, and detect wins or draws.',
    starter:'# Tic-Tac-Toe\n\ndef print_board(board):\n    print("\\n" + "---".join(" " for _ in range(3)))\n    for row in board:\n        print(" " + " | ".join(row))\n        print("---".join(" " for _ in range(3)))\n\ndef check_winner(board):\n    for row in board:\n        if row[0] == row[1] == row[2] != " ":\n            return row[0]\n    for col in range(3):\n        if board[0][col] == board[1][col] == board[2][col] != " ":\n            return board[0][col]\n    if board[0][0] == board[1][1] == board[2][2] != " ":\n        return board[0][0]\n    if board[0][2] == board[1][1] == board[2][0] != " ":\n        return board[0][2]\n    return None\n\ndef is_full(board):\n    return all(cell != " " for row in board for cell in row)\n\nboard = [[" " for _ in range(3)] for _ in range(3)]\nplayer = "X"\n\nwhile True:\n    print_board(board)\n    print(f"Player {player}\'s turn")\n    \n    try:\n        row = int(input("Row (0-2): "))\n        col = int(input("Col (0-2): \'"))\n    except ValueError:\n        print("Enter numbers 0-2!")\n        continue\n    \n    if row < 0 or row > 2 or col < 0 or col > 2 or board[row][col] != " ":\n        print("Invalid move!")\n        continue\n    \n    board[row][col] = player\n    \n    winner = check_winner(board)\n    if winner:\n        print_board(board)\n        print(f"Player {winner} wins!")\n        break\n    \n    if is_full(board):\n        print_board(board)\n        print("It\'s a draw!")\n        break\n    \n    player = "O" if player == "X" else "X"',
    hint:'Use a 3x3 list of lists for the board. Check rows, columns, and both diagonals for a winner.'
  },
  {
    id:'simple-webpage',
    title:'Simple Web Page Generator',
    difficulty:'Intermediate',
    description:'Create a program that generates a simple HTML webpage. Ask the user for a title, heading, and paragraphs, then write the HTML to a file.',
    starter:'# Simple Web Page Generator\n\ndef generate_html(title, heading, paragraphs, bg_color="#ffffff", text_color="#333333"):\n    html = f"""<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>{title}</title>\n    <style>\n        body {{ font-family: Arial, sans-serif; background: {bg_color}; color: {text_color}; padding: 40px; line-height: 1.6; }}\n        h1 {{ color: {text_color}; }}\n    </style>\n</head>\n<body>\n    <h1>{heading}</h1>\\n"""\n    for p in paragraphs:\n        html += f"    <p>{p}</p>\\n"\n    html += """</body>\n</html>"""\n    return html\n\ntitle = input("Page title: ")\nheading = input("Main heading: ")\nprint("Enter paragraphs (empty line to stop):")\nparagraphs = []\nwhile True:\n    p = input()\n    if not p:\n        break\n    paragraphs.append(p)\n\nhtml = generate_html(title, heading, paragraphs)\nfilename = title.lower().replace(" ", "-") + ".html"\n\nwith open(filename, "w") as f:\n    f.write(html)\n\nprint(f"Page saved as {filename}")',
    hint:'Use f-strings with triple quotes for multi-line HTML. Be careful with curly braces in CSS/f-strings — use double curly braces {{ }} for literal braces.'
  }
];

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
}

function clSwitchTab(tab) {
  currentClTab = tab;
  var tabs = ['guides', 'dictionary', 'projects'];
  tabs.forEach(function(t) {
    var btn = $('cl-tab-' + t);
    var content = $('cl-' + t);
    if (btn) btn.style.cssText = 'background:none;border:none;padding:6px 14px;font-size:11px;cursor:pointer;color:var(--fg-dim);border-radius:4px';
    if (content) content.style.display = 'none';
  });
  var activeBtn = $('cl-tab-' + tab);
  var activeContent = $('cl-' + tab);
  if (activeBtn) activeBtn.style.cssText = 'background:none;border:none;padding:6px 14px;font-size:11px;cursor:pointer;color:var(--fg);border-radius:4px;background:var(--bg2)';
  if (activeContent) activeContent.style.display = 'block';
}

function clLoadGuide(id) {
  var guide = null;
  for (var i = 0; i < CODEGUIDES.length; i++) {
    if (CODEGUIDES[i].id === id) {
      guide = CODEGUIDES[i];
      break;
    }
  }
  if (!guide) return;

  var contentEl = $('cl-guide-content');
  if (contentEl) contentEl.innerHTML = '<h2 style="color:var(--cyan);margin:0 0 12px;font-size:15px">' + escapeHtml(guide.title) + '</h2>'
    + '<div style="font-size:10px;color:var(--teal);margin-bottom:12px">' + escapeHtml(guide.category) + '</div>'
    + guide.content;

  var viewEl = $('cl-guide-view');
  var listEl = $('cl-guides-list');
  if (viewEl) viewEl.style.display = 'block';
  if (listEl) listEl.style.display = 'none';

  var editor = $('cl-code-input');
  if (editor) {
    var codeMatch = guide.content.match(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/i);
    if (codeMatch) {
      editor.value = escapeHtml(codeMatch[1]);
    } else {
      editor.value = '# ' + guide.title + '\n# Write your code here\n';
    }
  }
}

function clBackToGuides() {
  var viewEl = $('cl-guide-view');
  var listEl = $('cl-guides-list');
  if (viewEl) viewEl.style.display = 'none';
  if (listEl) listEl.style.display = 'block';
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

  if (!editor || !output) return;

  var code = editor.value;
  if (!code.trim()) {
    output.innerHTML = '<div style="color:var(--fg-dim);font-size:11px">No code to run.</div>';
    return;
  }

  var lang = langSelect ? langSelect.value : 'python';

  if (runBtn) {
    runBtn.disabled = true;
    runBtn.textContent = 'Running...';
  }

  output.innerHTML = '<div style="color:var(--fg-dim);font-size:11px">Running...</div>';

  fetch('/api/code/run', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({code: code, language: lang})
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      if (data.output) {
        var escaped = escapeHtml(data.output);
        output.innerHTML = '<pre style="margin:0;font-size:11px;color:var(--fg);line-height:1.5;white-space:pre-wrap;word-break:break-word">' + escaped + '</pre>';
      } else {
        output.innerHTML = '<div style="color:var(--teal);font-size:11px">Code executed successfully (no output).</div>';
      }
    } else {
      var errMsg = data.error || 'Unknown error';
      output.innerHTML = '<div style="color:var(--red);font-size:11px;line-height:1.5">' + escapeHtml(errMsg) + '</div>';
    }
  })
  .catch(function(err) {
    output.innerHTML = '<div style="color:var(--red);font-size:11px">Error: ' + escapeHtml(err.message) + '</div>';
  })
  .finally(function() {
    if (runBtn) {
      runBtn.disabled = false;
      runBtn.textContent = 'Run';
    }
  });
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
