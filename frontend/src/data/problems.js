export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
}`,
      python: `def twoSum(nums, target):
    pass`,
      java: `
public static int[] twoSum(int[] nums, int target) {
    return new int[0];
}
`,
    },
    testCases: {
      javascript: `
console.log(twoSum([2,7,11,15],9));
console.log(twoSum([3,2,4],6));
console.log(twoSum([3,3],6));
`,
      python: `
print(twoSum([2,7,11,15],9))
print(twoSum([3,2,4],6))
print(twoSum([3,3],6))
`,
      java: `
public static void main(String[] args) {
    System.out.println(Arrays.toString(twoSum(new int[]{2,7,11,15},9)));
    System.out.println(Arrays.toString(twoSum(new int[]{3,2,4},6)));
    System.out.println(Arrays.toString(twoSum(new int[]{3,3},6)));
}
`,
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
    },
  },

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string.",
      notes: ["Must be done in-place."],
    },
    examples: [
      { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵"],
    starterCode: {
      javascript: `function reverseString(s) {}`,
      python: `def reverseString(s): pass`,
      java: `
public static void reverseString(char[] s) {
}
`,
    },
    testCases: {
      javascript: `
let a=["h","e","l","l","o"];
reverseString(a);
console.log(a);
`,
      python: `
a=["h","e","l","l","o"]
reverseString(a)
print(a)
`,
      java: `
public static void main(String[] args) {
    char[] a={'h','e','l','l','o'};
    reverseString(a);
    System.out.println(Arrays.toString(a));
}
`,
    },
    expectedOutput: {
      javascript: '["o","l","l","e","h"]',
      python: "['o', 'l', 'l', 'e', 'h']",
      java: "[o, l, l, e, h]",
    },
  },

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Return true if palindrome after removing non-alphanumeric.",
      notes: [],
    },
    examples: [
      { input: `"A man, a plan, a canal: Panama"`, output: "true" },
    ],
    constraints: ["1 ≤ s.length ≤ 2*10⁵"],
    starterCode: {
      javascript: `function isPalindrome(s) {}`,
      python: `def isPalindrome(s): pass`,
      java: `
public static boolean isPalindrome(String s) {
    return false;
}
`,
    },
    testCases: {
      javascript: `
console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("race a car"));
`,
      python: `
print(isPalindrome("A man, a plan, a canal: Panama"))
print(isPalindrome("race a car"))
`,
      java: `
public static void main(String[] args) {
    System.out.println(isPalindrome("A man, a plan, a canal: Panama"));
    System.out.println(isPalindrome("race a car"));
}
`,
    },
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
    },
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • DP",
    description: {
      text: "Find subarray with max sum.",
      notes: [],
    },
    examples: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵"],
    starterCode: {
      javascript: `function maxSubArray(nums) {}`,
      python: `def maxSubArray(nums): pass`,
      java: `
public static int maxSubArray(int[] nums) {
    return 0;
}
`,
    },
    testCases: {
      javascript: `
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
`,
      python: `
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))
`,
      java: `
public static void main(String[] args) {
    System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4}));
}
`,
    },
    expectedOutput: {
      javascript: "6",
      python: "6",
      java: "6",
    },
  },
};

export const LANGUAGE_CONFIG = {
  javascript: { name: "JavaScript", icon: "/javascript.png", monacoLang: "javascript" },
  python: { name: "Python", icon: "/python.png", monacoLang: "python" },
  java: { name: "Java", icon: "/java.png", monacoLang: "java" },
};
