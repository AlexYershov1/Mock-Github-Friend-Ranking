import { UsersDB } from "../models/userModel.js";
import { graph } from "../server.js";

export const userDataCtrl = {
  users: async (req, res) => {
    try {
      // UsersDB.find({}, 'name creation_date img profile_link' )
      UsersDB.aggregate([
        {
          $project: {
            name: "$name",
            avatar: "$img",
            profileLink: "$profile_link",
            creationDate: {
              $dateToString: {
                format: "%Y.%m.%d",
                date: "$creation_date",
              },
            },
          },
        },
      ])
        // .lean()
        .exec((err, result) => {
          if (err) throw Error("request could not execute query");
          result.forEach((user, index) => (user.id = index));
          res.json(result);
        });
    } catch (err) {
      res.status(500).json({ msg: err.msg, success: false });
    }
  },
  rank: async (req, res) => {
    try {
      const id = req.query._id;
      const depth = req.query.depth;

      if (id === undefined || depth === undefined)
        throw Error("request fields missing");

      graph.rank(id, depth, (result) =>
        res.json({ rank: result, success: true })
      );
    } catch (err) {
      res.status(500).json({ msg: err.msg, success: false });
    }
  },
};
