const express = require("express");
const app = express.Router();

const functions = require("../structs/functions.js");

app.get("/fortnite/api/calendar/v1/timeline", (req, res) => {
  const memory = functions.GetVersionInfo(req);

  let activeEvents = [
    {
      eventType: `EventFlag.Season${memory.season}`,
      activeUntil: "9999-01-01T00:00:00.000Z",
      activeSince: "2020-01-01T00:00:00.000Z",
    },
    {
      eventType: `EventFlag.${memory.lobby}`,
      activeUntil: "9999-01-01T00:00:00.000Z",
      activeSince: "2020-01-01T00:00:00.000Z",
    },
  ];

  if (memory.build == 5.1) {
    activeEvents.push({
      eventType: "EventFlag.BirthdayBattleBus",
      activeUntil: "9999-01-01T00:00:00.000Z",
      activeSince: "2020-01-01T00:00:00.000Z",
    });
  }
  if (memory.build >= 6.2) {
    activeEvents.push(
      {
        eventType: "EventFlag.Fortnitemares",
        activeUntil: "9999-01-01T00:00:00.000Z",
        activeSince: "2020-01-01T00:00:00.000Z",
      },
      {
        eventType: "EventFlag.FortnitemaresPhase1",
        activeUntil: "9999-01-01T00:00:00.000Z",
        activeSince: "2020-01-01T00:00:00.000Z",
      },
      {
        eventType: "POI0",
        activeUntil: "9999-01-01T00:00:00.000Z",
        activeSince: "2020-01-01T00:00:00.000Z",
      }
    );
  }
  if (memory.build >= 6.22) {
    activeEvents.push({
      eventType: "EventFlag.FortnitemaresPhase2",
      activeUntil: "9999-01-01T00:00:00.000Z",
      activeSince: "2020-01-01T00:00:00.000Z",
    });
  }
  if (memory.build == 6.2 || memory.build == 6.21) {
    activeEvents.push(
      {
        eventType: "EventFlag.LobbySeason6Halloween",
        activeUntil: "9999-01-01T00:00:00.000Z",
        activeSince: "2020-01-01T00:00:00.000Z",
      },
      {
        eventType: "EventFlag.HalloweenBattleBus",
        activeUntil: "9999-01-01T00:00:00.000Z",
        activeSince: "2020-01-01T00:00:00.000Z",
      }
    );
  }

  res.json({
    channels: {
      "client-matchmaking": {
        states: [],
        cacheExpire: "9999-01-01T00:00:00.000Z",
      },
      "client-events": {
        states: [
          {
            validFrom: "0001-01-01T00:00:00.000Z",
            activeEvents: activeEvents,
            state: {
              activeStorefronts: [],
              eventNamedWeights: {},
              seasonNumber: memory.season,
              seasonTemplateId: `AthenaSeason:athenaseason${memory.season}`,
              matchXpBonusPoints: 0,
              seasonBegin: "2020-01-01T00:00:00Z",
              seasonEnd: "9999-01-01T00:00:00Z",
              seasonDisplayedEnd: "9999-01-01T00:00:00Z",
              weeklyStoreEnd: "9999-01-01T00:00:00Z",
              stwEventStoreEnd: "9999-01-01T00:00:00.000Z",
              stwWeeklyStoreEnd: "9999-01-01T00:00:00.000Z",
              dailyStoreEnd: "9999-01-01T00:00:00Z",
            },
          },
        ],
        cacheExpire: "9999-01-01T00:00:00.000Z",
      },
    },
    eventsTimeOffsetHrs: 0,
    cacheIntervalMins: 10,
    currentTime: new Date().toISOString(),
  });
});

module.exports = app;
