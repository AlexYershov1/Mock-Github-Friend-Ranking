import { UsersDB } from "../models/userModel.js";

export class Graph {
  constructor() {}

  /**
   * add user to the graph
   * @param {import("mongoose").ObjectId}} newUser
   */
  addVertex(newUser) {
    /**
     * Not implamenting because it's not part of the exercise.
     * Other possible features are adding user with followers, or
     * a follower alone (addEdge function)
     */
  }

  /**
   * Implementing BFS on the graph to get friend ranking
   * using queue and no recursion.
   */
  rank(userID, depth, callback) {
    const q = [],
      visited = [],
      level = [];

    let counter = 0;

    visited[userID] = true
    level[userID] = 0;
    q.push(userID);

    asyncLoop(
      q.length,
      (loop) => {
        // visited[q[0]] = true;
        UsersDB.findOne({ _id: q[0] }, "followers")
          .lean()
          .populate("followers", "followers")
          .exec(function (err, new_nodes) {
            if (err) throw Error('Something went wrong while calculating ranking')
            else {
              new_nodes &&
                new_nodes.followers.forEach((follower) => {
                  const followerID = follower._id.toString();
                  if (!visited[followerID] && level[q[0]] < depth) {
                    counter++;
                    visited[followerID] = true
                    level[followerID] = level[q[0]] + 1;
                    q.push(followerID);
                  }
                });
              q.shift();
              loop.refresh(q.length);
              loop.next();
            }
          });
      },
      function () {
        callback(counter);
      }
    );
  }
}

function asyncLoop(iterations, func, callback, foo) {
  var done = false;
  var loop = {
    next: function () {
      if (done) {
        return;
      }

      if (iterations) {
        func(loop);
      } else {
        done = true;
        if (callback) callback(foo);
      }
      iterations--;
    },

    isEnd: function () {
      return done;
    },

    refresh: function (it) {
      iterations = it;
    },

    break: function () {
      done = true;
      callback();
    },
  };
  loop.next();
  return loop;
}
