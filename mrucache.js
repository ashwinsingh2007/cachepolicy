

// LRU cache

class NodeStruct {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LRU {
    constructor(cacheLimit = 5) {
        this.size = 0;
        this.cacheLimit = cacheLimit;
        this.head = null;
        this.tail = null;
        this.cache = {};
    }

    insert(key, value) {
        if (this.size === this.cacheLimit && this.cacheLimit[key])
            this.remove(this.head.key)
        if (!this.head) {
            this.head = this.tail = new NodeStruct(key, value);
        } else {
            const node = new NodeStruct(key, value, this.head);
            this.head.prev = node;
            this.head = node;
        }
        this.cache[key] = this.head;
        this.size++;
    }

    get(key) {
        if (this.cache[key]) {
            const value = this.cache[key].value;
            this.remove(key)
            this.insert(key, value);
            return value;
        }
        console.log(`Not available in case but added now ${key}`);
    }

    remove(key) {
        const node = this.cache[key];
        if (node.prev !== null)
            node.prev.next = node.next;
        else
            this.head = node.next;
        if (node.next !== null)
            node.next.prev = node.prev;
        else
            this.tail = node.prev
        delete this.cache[key];
        this.size--;
    }

    stateOfCache() {
       // return this.cache;
      return Object.keys(this.cache).map((k) => ({
          key: this.cache[k].key,
          value: this.cache[k].value
      }))
    }
}

let lruCache = new LRU();
const a = ['A', 'B', 'C', 'D', 'E', 'F', 'C', 'G', 'B'];
a.forEach((v, i) => {
  lruCache.insert(i, v);  
});

console.log('lruCache---', lruCache.stateOfCache())