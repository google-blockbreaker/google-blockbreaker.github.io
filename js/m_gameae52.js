this._s = this._s || {};
(function (_) {
  var window = this;
  try {
    // console.log('try wQlYve');
    //_.q("wQlYve");
    _.Tu = new _.Xe(_.fr);
    _.u();
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.NVy = _.H("nnMuPb");
    _.OVy = _.H("GDmPW");
    _.PVy = _.H("WJ84Gf");
  } catch (e) {
    _._DumpException(e)
  }
  try {
    var BVy = function (a) {
      if (!a.Aa) {
        a.Aa = !0;
        for (const b of a.Da) b()
      }
    }, CVy = class {
      constructor(a) {
        this.src = a;
        this.Aa = !1;
        this.Da = []
      }

      isLoaded() {
        return this.Aa
      }
    };
    var DVy, loadMobile, GVy, FVy, JVy, KVy, MVy, LVy;
    DVy = _.na();
    loadMobile = DVy.includes("iPad") || DVy.includes("iPhone") || DVy.includes("iPod");

    // console.log('loadMobile', loadMobile);

    GVy = function (a) {
      // console.log('btn click');
      a.oa && !a.Ca && (a.Ba !== null && a.Ca || FVy(a))
    };
    FVy = function (a) {
      a.Ca || (a.Ba = a.oa.createBufferSource(), a.Ba.buffer = a.oa.createBuffer(1, 1, 22050), a.Ba.connect(a.oa.destination), _.vn(a.Ba, "ended", () => {
        a.Ca = !0
      }), a.Ba.start(0))
    };
    _.HVy = function (a) {
      a.Aa && (a.Aa.gain.value = 0)
    };
    _.IVy = function (a) {
      a.Aa && (a.Aa.gain.value = 1)
    };
    _.L3 = class {
      constructor(a, b) {
        this.Da = a;
        this.nfa = b;
        this.Ba = this.Aa = this.oa = null;
        this.Ca = !1
      }

      init(buttonStart) {
        // console.log('initA', buttonStart);
        //debugger;

        if (!JVy) return !1;
        if (this.oa) return !0;
        this.oa = new (_.da.AudioContext || _.da.webkitAudioContext);
        this.Aa = this.oa.createGain();
        this.Aa.connect(this.oa.destination);
        for (const b of Object.values(this.Da)) b.init(this.oa);
        for (const b of Object.values(this.nfa)) b.init(this.oa, this.Aa);
        loadMobile && (GVy(this), _.vn(buttonStart, "touchend", () => {
          GVy(this)
        }));
        return !0
      }

      isInitialized() {
        return !!this.oa
      }

      getContext() {
        return this.oa
      }

      destroy() {
        this.oa.close();
        this.oa = null
      }

      reset() {
        for (const a of Object.values(this.Da)) a.Da = [];
        for (const a of Object.values(this.nfa)) a.stop()
      }
    };
    JVy = !(!_.da.AudioContext && !_.da.webkitAudioContext) && !!_.da.GainNode;
    KVy = function (a) {
      if (a.Aa) {
        var b = a.Aa.currentTime * 1E3;
        for (const c of Object.keys(a.Ba)) {
          const d = a.Ba[c];
          !d.pxc && d.playTime + a.duration < b && delete a.Ba[c]
        }
      }
    };
    _.M3 = class {
      constructor(a, b, c) {
        this.oa = a;
        this.name = b;
        this.duration = c;
        this.Ba = {};
        this.Ca = this.Aa = this.Da = null;
        this.Ea = 0
      }

      init(a, b) {
        this.Aa = a;
        this.Ca = b;
        this.Aa.createGain && (this.Da = this.Aa.createGain())
      }

      play(a = 0, b = !1) {
        if (!this.Aa || !this.Ca) return -1;
        KVy(this);
        a = this.Aa.currentTime + a / 1E3;
        const c = this.Aa.createBufferSource();
        this.Da ? (c.connect(this.Da), this.Da.connect(this.Ca)) : c.connect(this.Ca);
        c.loop = b;
        try {
          c.buffer = this.oa.Ca[this.name]
        } catch (e) {
          return -1
        }
        c.playbackRate.value = 1;
        c.start(a, 0);
        const d = this.Ea++;
        this.Ba[String(d)] = {node: c, playTime: a * 1E3, pxc: b};
        return d
      }

      stop(a) {
        KVy(this);
        if (a !== void 0) {
          if (this.Ba[a]) {
            try {
              this.Ba[a].node.stop(0)
            } catch (b) {
            }
            delete this.Ba[a]
          }
        } else for (const b of Object.keys(this.Ba)) this.stop(b)
      }
    };
    MVy = function (a, b) {
      b = b.getResponse();
      const c = LVy(a, new Uint8Array(b)), d = Object.keys(c);
      a.status = 2;
      const e = (f, g) => {
        g && f && (a.Ca[f] = g);
        d.length === 0 ? (a.status = 3, BVy(a)) : (f = d.shift(), a.oa.decodeAudioData(c[f], h => {
          e(f, h)
        }))
      };
      e(null, null)
    };
    LVy = function (a, b) {
      const c = {}, d = {}, e = {};
      let f = 0, g = !1;
      b[0] === 0 && (g = !0);
      Object.entries(a.index).forEach(([l, n]) => {
        d[l] = [];
        e[l] = [];
        let r = b[n];
        g && (r |= b[++n] << 8);
        f += r;
        for (var t = 0; t < r; t++) g ? (d[l].push(b[n + 1] | b[n + 2] << 8), n += 2) : d[l].push(b[++n]);
        for (t = 0; t < r; t++) g ? (e[l].push(b[n + 1] | b[n + 2] << 8), n += 2) : e[l].push(b[++n])
      });
      let h = f * 2 + Object.keys(a.index).length;
      g && (h *= 2, h += 2);
      let k = b[h];
      ++h;
      g && (k |= b[h] << 8, ++h);
      Object.entries(a.index).forEach(([l]) => {
        let n = 0;
        _.$a(d[l], x => {
          n += a.Ba - (b[h + x * 32 + 2] & 2 ? 0 : 1)
        }, a);
        c[l] = new ArrayBuffer(n);
        const r = new Uint8Array(c[l]);
        let t = 0;
        for (let x = 0; x < d[l].length; x++) {
          const y = h + d[l][x] * 32, F = a.Ba - (b[y + 2] & 2 ? 0 : 1), I = h + k * 32 + e[l][x] * (a.Ba - 32);
          r.set(b.subarray(y, y + 32), t);
          t += 32;
          r.set(b.subarray(I, I + F - 32), t);
          t += F - 32
        }
      });
      return c
    };
    _.N3 = class extends CVy {
      constructor(a, b, c, d = 314) {
        super("." + a + b + ".bin");
        this.index = c;
        this.Ba = d;
        this.oa = null;
        this.Ca = {};
        this.status = 0
      }

      getStatus() {
        return this.status
      }

      init(a) {
        this.oa = a
      }

      preload(a = !1) {
        if ((this.status === 0 || a) && this.oa) {
          var b = new _.Kr;
          b.setResponseType("arraybuffer");
          b.listen("complete", () => {
            MVy(this, b)
          });
          b.send(this.src);
          this.status = 1
        }
      }
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.Zix = _.w("LCV2ef", [_.nr, _.fr]);
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.qld = _.Cr("zD2Asd", []);
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.kkd = _.w("NdLnDf", []);
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.Mjd = _.w("QKZgZd", []);
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.rld = _.w("Wct42", [_.Gr, _.Mjd, _.kkd, _.qld]);
  } catch (e) {
    _._DumpException(e)
  }
  try {
    var ahd;
    _.$gd = function (a, b, c) {
      _.We.call(this);
      this.Cn = null;
      this.Ba = !1;
      this.kS = a;
      this.Ca = c;
      this.oa = b || window;
      this.Aa = (0, _.ue)(this.hOc, this)
    };
    ahd = function (a) {
      var b = b || 0;
      return function () {
        return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
      }
    };
    _.Lh(_.$gd, _.We);
    _.ba = _.$gd.prototype;
    _.ba.start = function () {
      this.stop();
      this.Ba = !1;
      const a = bhd(this), b = chd(this);
      a && !b && this.oa.mozRequestAnimationFrame ? (this.Cn = _.te(this.oa, "MozBeforePaint", this.Aa), this.oa.mozRequestAnimationFrame(null), this.Ba = !0) : this.Cn = a && b ? a.call(this.oa, this.Aa) : this.oa.setTimeout(ahd(this.Aa), 20)
    };
    _.ba.stop = function () {
      if (this.isActive()) {
        const a = bhd(this), b = chd(this);
        a && !b && this.oa.mozRequestAnimationFrame ? _.yn(this.Cn) : a && b ? b.call(this.oa, this.Cn) : this.oa.clearTimeout(this.Cn)
      }
      this.Cn = null
    };
    _.ba.fire = function () {
      this.stop();
      this.hOc()
    };
    _.ba.isActive = function () {
      return this.Cn != null
    };
    _.ba.hOc = function () {
      this.Ba && this.Cn && _.yn(this.Cn);
      this.Cn = null;
      this.kS.call(this.Ca, _.Kh())
    };
    _.ba.Uc = function () {
      this.stop();
      _.$gd.Re.Uc.call(this)
    };
    var bhd = function (a) {
      a = a.oa;
      return a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || null
    }, chd = function (a) {
      a = a.oa;
      return a.cancelAnimationFrame || a.cancelRequestAnimationFrame || a.webkitCancelRequestAnimationFrame || a.mozCancelRequestAnimationFrame || a.oCancelRequestAnimationFrame || a.msCancelRequestAnimationFrame || null
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    var dhd, hhd;
    dhd = {};
    _.ehd = null;
    _.fhd = null;
    _.nE = function (a) {
      const b = _.oe(a);
      b in dhd || (dhd[b] = a);
      _.ghd()
    };
    _.oE = function (a) {
      a = _.oe(a);
      delete dhd[a];
      _.Cc(dhd) && _.fhd && _.fhd.stop()
    };
    _.ghd = function () {
      _.fhd || (_.ehd ? _.fhd = new _.$gd(function (b) {
        hhd(b)
      }, _.ehd) : _.fhd = new _.gs(function () {
        hhd(_.Kh())
      }, 20));
      const a = _.fhd;
      a.isActive() || a.start()
    };
    hhd = function (a) {
      _.yc(dhd, function (b) {
        b.wt(a)
      });
      _.Cc(dhd) || _.ghd()
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    // console.log('start LCV2ef');
    //debugger;

    _.q("LCV2ef");

    var QVy = function (a) {
      switch (a) {
        case 0:
          O3.VDd.play();
          break;
        case 1:
          O3.Aud.play();
          break;
        case 2:
          O3.WAd.play();
          break;
        case 3:
          O3.gEd.play();
          break;
        case 4:
          O3.wxd.play()
      }
    }, RVy = function (a) {
      switch (a) {
        case 0:
          P3.Bud.play();
          break;
        case 1:
          P3.XAd.play();
          break;
        case 2:
          P3.hEd.play();
          break;
        case 3:
          P3.ENc.play()
      }
    }, SVy = function (a) {
      switch (a) {
        default:
          return -1;
        case 1:
          return 0;
        case 2:
          return 1;
        case 3:
          return 2;
        case 4:
          return 3;
        case 5:
        case 6:
          return 5;
        case 7:
        case 8:
          return 6;
        case 9:
          return 8;
        case 10:
          return 9;
        case 11:
          return 10;
        case 12:
          return 11;
        case 13:
          return 17
      }
    }, UVy = function (a, b, c) {
      return 1 - Math.max(0, (c.y - Q3.height - (a.y + TVy.height * b.height)) / b.height)
    }, R3 = function () {
      return Math.random() < .5
    }, YVy = function (a) {
      a += VVy;
      return {gWb: Math.floor(a % WVy / XVy), V4b: Math.floor(a / WVy) * WVy}
    }, ZVy = {name: "bbfbx"}, $Vy = {
      Ksa: new _.N3("/sound/", "ball_audio", {
        BALL_DROPPED: 2,
        BALL_LAUNCH: 132,
        BLUE_BALL_BOUNCE: 230,
        GRAVITY_BALL: 544,
        GREEN_BALL_BOUNCE: 602,
        LOOPING_BALL: 916,
        PADDLE_BOUNCE: 1170,
        RED_BALL_BOUNCE: 1204,
        WAVE_BALL: 1518,
        WHITE_BALL_BOUNCE: 1728,
        YELLOW_BALL_BOUNCE: 2042
      }, 418)
    }, O3 = {
      uud: new _.M3($Vy.Ksa, "BALL_DROPPED", 835.918),
      NMc: new _.M3($Vy.Ksa, "BALL_LAUNCH", 626.939),
      Aud: new _.M3($Vy.Ksa, "BLUE_BALL_BOUNCE", 2037.55),
      DNc: new _.M3($Vy.Ksa, "GRAVITY_BALL", 365.714),
      wxd: new _.M3($Vy.Ksa, "GREEN_BALL_BOUNCE", 2037.55),
      tQb: new _.M3($Vy.Ksa, "LOOPING_BALL", 1645.71),
      CAd: new _.M3($Vy.Ksa, "PADDLE_BOUNCE", 208.98),
      WAd: new _.M3($Vy.Ksa, "RED_BALL_BOUNCE", 2037.55),
      kQc: new _.M3($Vy.Ksa, "WAVE_BALL", 1358.37),
      VDd: new _.M3($Vy.Ksa, "WHITE_BALL_BOUNCE", 2037.55),
      gEd: new _.M3($Vy.Ksa,
        "YELLOW_BALL_BOUNCE", 2037.55)
    }, aWy = class extends _.L3 {
      constructor() {
        super($Vy, O3)
      }
    };
    var S3 = {
      YU: new _.N3("/sound/", "block_audio", {
        ACID_BLOCK_HIT: 2,
        BLUE_BLOCK_HIT: 336,
        BLUE_MIRROR_BLOCK_HIT: 550,
        BLUE_POWERUP_BLOCK_HIT: 764,
        BRICK_BLOCK_FIRST_HIT: 850,
        BRICK_BLOCK_SECOND_HIT: 920,
        GHOST_BLOCK_APPEARS: 1098,
        GREEN_BLOCK_HIT: 1404,
        GREEN_MIRROR_BLOCK_HIT: 1618,
        GREEN_POWERUP_BLOCK_HIT: 1832,
        HEART_BLOCK_HIT: 1918,
        LEVEL_PROGRESSION: 2056,
        MULTIBALL_BLOCK_HIT: 2402,
        RED_BLOCK_HIT: 2508,
        RED_MIRROR_BLOCK_HIT: 2722,
        RED_POWERUP_BLOCK_HIT: 2936,
        TNT_BLOCK_EXPLODES: 3022,
        TNT_BLOCK_HIT: 3180,
        YELLOW_BLOCK_HIT: 3330,
        YELLOW_MIRROR_BLOCK_HIT: 3544,
        YELLOW_POWERUP_BLOCK_HIT: 3758,
        MUSHROOM_BLOCK_HIT: 3844
      }, 418)
    }, P3 = {
      qtd: new _.M3(S3.YU, "ACID_BLOCK_HIT", 2168.16),
      Bud: new _.M3(S3.YU, "BLUE_BLOCK_HIT", 1384.49),
      Dud: new _.M3(S3.YU, "BLUE_MIRROR_BLOCK_HIT", 1384.49),
      Eud: new _.M3(S3.YU, "BLUE_POWERUP_BLOCK_HIT", 548.571),
      Jud: new _.M3(S3.YU, "BRICK_BLOCK_FIRST_HIT", 444.082),
      Kud: new _.M3(S3.YU, "BRICK_BLOCK_SECOND_HIT", 1149.39),
      qxd: new _.M3(S3.YU, "GHOST_BLOCK_APPEARS", 1985.31),
      ENc: new _.M3(S3.YU, "GREEN_BLOCK_HIT", 1384.49),
      yxd: new _.M3(S3.YU,
        "GREEN_MIRROR_BLOCK_HIT", 1384.49),
      zxd: new _.M3(S3.YU, "GREEN_POWERUP_BLOCK_HIT", 548.571),
      Exd: new _.M3(S3.YU, "HEART_BLOCK_HIT", 888.163),
      czd: new _.M3(S3.YU, "LEVEL_PROGRESSION", 2246.53),
      Mzd: new _.M3(S3.YU, "MULTIBALL_BLOCK_HIT", 679.184),
      XAd: new _.M3(S3.YU, "RED_BLOCK_HIT", 1384.49),
      ZAd: new _.M3(S3.YU, "RED_MIRROR_BLOCK_HIT", 1384.49),
      bBd: new _.M3(S3.YU, "RED_POWERUP_BLOCK_HIT", 548.571),
      RPc: new _.M3(S3.YU, "TNT_BLOCK_EXPLODES", 1018.78),
      SPc: new _.M3(S3.YU, "TNT_BLOCK_HIT", 966.531),
      hEd: new _.M3(S3.YU, "YELLOW_BLOCK_HIT",
        1384.49),
      iEd: new _.M3(S3.YU, "YELLOW_MIRROR_BLOCK_HIT", 1384.49),
      kEd: new _.M3(S3.YU, "YELLOW_POWERUP_BLOCK_HIT", 548.571),
      Ozd: new _.M3(S3.YU, "MUSHROOM_BLOCK_HIT", 2847.35)
    }, bWy = class extends _.L3 {
      constructor() {
        super(S3, P3)
      }
    };
    var cWy = {Qzd: new _.N3("/sound/", "music_audio.1", {GAME_OVER_LOOP: 2}, 418)},
      dWy = {PPb: new _.M3(cWy.Qzd, "GAME_OVER_LOOP", 7993.47)}, eWy = class extends _.L3 {
        constructor() {
          super(cWy, dWy)
        }
      };
    var T3 = {
      gO: new _.N3("/sound/", "powerup_audio", {
        BLOCK_TARGETED: 2,
        BLUE_POWERUP_HITS_PADDLE: 36,
        FIREBALL_ENABLED: 198,
        FIREBALL_HITS_BLOCK: 444,
        FIREBALL_LAUNCHED: 550,
        FIREBALL_TIMEOUT: 712,
        GREEN_POWERUP_HITS_PADDLE: 874,
        HEART_BOUNCE_1: 1036,
        HEART_BOUNCE_2: 1138,
        HEART_BOUNCE_3: 1240,
        HEART_COLLECTED: 1342,
        HEART_OR_POWERUP_DROP: 1608,
        LASER_ENABLED: 1694,
        LASER_HITS_BLOCK: 1884,
        LASER_SHOOTS: 1950,
        LASER_TIMEOUT: 2028,
        LEVITATION_ENABLED: 2098,
        LEVITATION_TIMEOUT: 2472,
        PADDLE_ELONGATES: 2758,
        PADDLE_SHRINKS: 2852,
        RED_POWERUP_HITS_PADDLE: 3018,
        SHIELD_LOWERS: 3180,
        SHIELD_RISES: 3214,
        TARGETING_ENABLED: 3252,
        TARGETING_TIMEOUT: 3370,
        YELLOW_POWERUP_HITS_PADDLE: 3432
      }, 418)
    }, Z3 = {
      yud: new _.M3(T3.gO, "BLOCK_TARGETED", 208.98),
      Fud: new _.M3(T3.gO, "BLUE_POWERUP_HITS_PADDLE", 1044.9),
      Pwd: new _.M3(T3.gO, "FIREBALL_ENABLED", 1593.47),
      Qwd: new _.M3(T3.gO, "FIREBALL_HITS_BLOCK", 679.184),
      sNc: new _.M3(T3.gO, "FIREBALL_LAUNCHED", 1044.9),
      Rwd: new _.M3(T3.gO, "FIREBALL_TIMEOUT", 1044.9),
      FNc: new _.M3(T3.gO, "GREEN_POWERUP_HITS_PADDLE", 1044.9),
      Fxd: new _.M3(T3.gO, "HEART_BOUNCE_1", 653.061),
      Gxd: new _.M3(T3.gO, "HEART_BOUNCE_2", 653.061),
      Hxd: new _.M3(T3.gO, "HEART_BOUNCE_3", 653.061),
      Ixd: new _.M3(T3.gO, "HEART_COLLECTED", 1724.08),
      INc: new _.M3(T3.gO, "HEART_OR_POWERUP_DROP", 548.571),
      Vyd: new _.M3(T3.gO, "LASER_ENABLED", 1227.76),
      Wyd: new _.M3(T3.gO, "LASER_HITS_BLOCK", 417.959),
      Xyd: new _.M3(T3.gO, "LASER_SHOOTS", 496.327),
      Yyd: new _.M3(T3.gO, "LASER_TIMEOUT", 444.082),
      dzd: new _.M3(T3.gO, "LEVITATION_ENABLED", 2429.39),
      ezd: new _.M3(T3.gO, "LEVITATION_TIMEOUT", 1854.69),
      DAd: new _.M3(T3.gO, "PADDLE_ELONGATES", 600.816),
      EAd: new _.M3(T3.gO, "PADDLE_SHRINKS", 1071.02),
      cBd: new _.M3(T3.gO, "RED_POWERUP_HITS_PADDLE", 1044.9),
      zPc: new _.M3(T3.gO, "SHIELD_LOWERS", 208.98),
      MBd: new _.M3(T3.gO, "SHIELD_RISES", 235.102),
      LCd: new _.M3(T3.gO, "TARGETING_ENABLED", 757.551),
      MCd: new _.M3(T3.gO, "TARGETING_TIMEOUT", 391.837),
      lEd: new _.M3(T3.gO, "YELLOW_POWERUP_HITS_PADDLE", 1044.9)
    }, fWy = class extends _.L3 {
      constructor() {
        super(T3, Z3)
      }
    };
    var gWy = {
      Xbc: new _.N3("/sound/", "projectile_audio", {
        ACID_HITS_PADDLE: 2,
        BRICK_RUBBLE_HITS_PADDLE: 136,
        MUSHROOM_SPORE_HITS_PADDLE: 314
      }, 418)
    }, hWy = {
      mMc: new _.M3(gWy.Xbc, "ACID_HITS_PADDLE", 862.041),
      Lud: new _.M3(gWy.Xbc, "BRICK_RUBBLE_HITS_PADDLE", 1149.39),
      Pzd: new _.M3(gWy.Xbc, "MUSHROOM_SPORE_HITS_PADDLE", 522.449)
    }, iWy = class extends _.L3 {
      constructor() {
        super(gWy, hWy)
      }
    };


    // console.log('jWy 600');

    var jWy = new _.Nl(600, 600), TVy = new _.Nl(7, 4), kWy = ["#5784e6", "#ca423e", "#ecc444", "#3b854b"],
      lWy = 60 * Math.PI / 180, mWy = 60 * Math.PI / 180, nWy = 45 * Math.PI / 180,
      oWy = [new _.Kl(-1, -1), new _.Kl(0, -1), new _.Kl(1, -1), new _.Kl(-1, 0), new _.Kl(1, 0), new _.Kl(-1, 1), new _.Kl(0, 1), new _.Kl(1, 1)],
      VVy = Math.PI / 8, XVy = Math.PI / 4, WVy = Math.PI / 2, $3 = new _.Nl(24, 24), pWy = new _.Nl(4, 22),
      a4 = new _.Nl(60, 32), b4 = new _.Nl(8, 12), qWy = new _.Nl(4, 8), c4 = new _.Nl(14, 24), rWy = new _.Nl(12, 10),
      sWy = 1 / 6, tWy = new _.Nl(21, 5), uWy = new _.Kl(-32, -42), vWy = new _.Nl(10,
        5), wWy = new _.Kl(-24, -24), Q3 = new _.Nl(24, 24), d4 = new _.Nl(28, 28), xWy = new _.Nl(16, 24),
      yWy = new _.Nl(9, 12), zWy = new _.Kl(-8, -16), AWy = [0, 20, 60, 120, 200, 300, 400], BWy = new _.Nl(4, 16),
      CWy = 1 / 3;
    var DWy = function (a, b) {
      a.oa.add(b)
    }, GWy = class {
      constructor(a) {
        this.Eb = a;
        this.oa = new Set;
        this.Aa = -1
      }

      reset() {
        this.oa.clear()
      }

      update() {
        for (var a of this.oa) a.Gga && this.oa.delete(a);
        a = this.Eb.oa;
        this.Eb.Ba.has(1) && EWy(this.Eb, 1) > 4E3 && a > this.Aa && (this.Aa = a + 500, this.oa.add(new FWy(this.Eb, a)))
      }

      render(a, b, c) {
        for (const d of this.oa) d.render(a, b, c)
      }
    }, HWy = class {
      // mobile class
      constructor(a, b, c, d, e, f, g, h = !1, k = !1) {
        this.startTime = a;
        this.Ca = b;
        this.frameCount = c;
        this.position = d;
        this.offset = e;
        this.Ba = f;
        this.imageUrl = g;
        this.oa = h;
        this.Aa = k;
        this.Gga = !1
      }

      render(a, b, c) {
        if ((c = e4(c, this.imageUrl)) && !(a < this.startTime)) if (a = Math.floor((a - this.startTime) / this.Ca), a >= this.frameCount.width) this.Gga = !0; else {
          var d = new _.Nl(c.width / this.frameCount.width, c.height / this.frameCount.height);
          b.save();
          b.translate(Math.round(this.position.x), Math.round(this.position.y));
          (this.oa || this.Aa) && b.scale(this.oa ? -1 : 1, this.Aa ? -1 : 1);
          b.drawImage(c, a * d.width, this.Ba * d.height, d.width, d.height, this.offset.x, this.offset.y, d.width, d.height);
          b.restore()
        }
      }
    }, FWy = class {
      constructor(a,
                  b) {
        this.startTime = b;
        this.Gga = !1;
        a = a.Aa;
        this.Da = Math.random() * a.width;
        this.oa = a.height;
        this.Ca = this.oa - 120;
        this.Ba = Math.floor(Math.random() * 5);
        this.Aa = R3()
      }

      render(a, b, c) {
        if (c = e4(c, "./images/block_breaker/bubble_particles.png")) {
          var d = a - this.startTime;
          if (d > 4E3) this.Gga = !0; else {
            a = d / 4E3;
            var e = this.oa * (1 - a) + this.Ca * a;
            d = this.Da + Math.sin(d / 800) * 20 * (this.Aa ? -1 : 1);
            b.globalAlpha = .5 * Math.pow(1 - a, CWy);
            b.drawImage(c, this.Ba * 14, 0, 14, 14, Math.round(d - 7), Math.round(e), 14, 14);
            b.globalAlpha =
              1
          }
        }
      }
    };
    var JWy = function (a, b, c) {
      const d = [0, 1, 2];
      b = new IWy(a, a.Da, a.Aa, a.Ca, a.Ga, a.QI, a.Eb, b, c ? d[Math.floor(Math.random() * d.length)] : null);
      a.oa.add(b);
      return b
    }, NWy = class {
      constructor(a, b, c, d, e, f, g, h) {
        this.Da = a;
        this.Aa = b;
        this.Ea = c;
        this.Ba = d;
        this.Ca = e;
        this.Ga = f;
        this.QI = g;
        this.Eb = h;
        this.oa = new Set;
        this.reset()
      }

      Ha(a, b, c) {
        b = JWy(this, b, c);
        b.setPosition(a);
        a = Math.PI / 4 + Math.PI / 2 * Math.ceil(Math.random() * 4);
        c = KWy(b);
        b.velocity.x = Math.cos(a) * c;
        b.velocity.y = Math.sin(a) * c;
        b.Ba === 1 && (LWy(b, R3()), b.oa.wB = b.oa.Sbb);
        b.La =
          !0
      }

      reset() {
        this.oa.clear()
      }

      update(a) {
        for (const d of this.oa) d.update(a);
        if (this.oa.size === 0) {
          a = this.Eb;
          a.Ca === 0 ? MWy(a, !0) : (--a.Ca, a.Qa = -1, a.Pa = a.oa);
          a = this.Ba;
          for (var b of a.oa) b.Aa = !0, b.Ba = b.Eb.oa;
          b = this.Ea;
          for (var c of b.oa) c.oa = !0, c.Aa = c.Eb.oa;
          this.Eb.Sj || (c = this.Eb, JWy(this, c.Va[c.Ca], !1))
        }
      }
    }, SWy = function (a) {
      if (!a.Ha) {
        a.Ha = !0;
        OWy(a.Eb) || PWy(a.Eb, !0);
        QWy(a);
        var b = KWy(a);
        a.velocity.x = b * Math.cos(lWy);
        a.velocity.y = -b * Math.sin(lWy);
        b = a.colorIndex;
        O3.NMc.play();
        QVy(b);
        b = a.Da;
        b = b.cG > 0 ? 2 : b.cG < 0 ? 1 : 0;
        if (b === 1 || b === 0 && R3()) a.velocity.x *= -1;
        a.Eb.Ba.has(3) && RWy(a);
        a.Eb.Ba.has(2) && (a.Ea = !0, Z3.sNc.play())
      }
    }, QWy = function (a) {
      a.position.x = a.Da.getPosition().x;
      a.position.y = a.Da.getPosition().y - 18
    }, WWy = function (a) {
      var b = a.Ca.oa;
      const c = a.Ca.Aa, d = a.Ca.blockSize;
      var e = [new _.Kl(a.position.x - 12, a.position.y - 12), new _.Kl(a.position.x + 12, a.position.y - 12), new _.Kl(a.position.x + 12, a.position.y + 12), new _.Kl(a.position.x - 12, a.position.y + 12)],
        f = [];
      for (var g of e) e = new _.Kl(Math.floor((g.x - c.x) / d.width), Math.floor((g.y -
        c.y) / d.height)), e.x >= 0 && e.x < b.length && e.y >= 0 && e.y < b[e.x].length && !b[e.x][e.y].Alb && f.push(e);
      f.sort((h, k) => _.Ll(a.position, new _.Kl(c.x + h.x * d.width + d.width / 2, c.y + h.y * d.height + d.height / 2)) - _.Ll(a.position, new _.Kl(c.x + k.x * d.width + d.width / 2, c.y + k.y * d.height + d.height / 2)));
      b = new _.Nl(d.width - 4, d.height - 4);
      for (const h of f) if (f = new _.Kl(c.x + h.x * d.width + 2, c.y + h.y * d.height + 2), g = TWy(a, f.x, f.y, b.width, b.height), g !== 4) {
        e = UWy(a.Ca, h, !0);
        if (e === 0 || e === 5) continue;
        if (a.Ea) {
          DWy(a.QI, new HWy(a.Eb.oa, 40, vWy, new _.Kl(f.x +
            d.width / 2, f.y + d.height / 2), wWy, a.colorIndex, "./images/block_breaker/v2/explosion.png", R3(), R3()));
          a.Ea = !1;
          Z3.Qwd.play();
          continue
        }
        const k = a.velocity.clone();
        switch (g) {
          case 0:
            a.velocity.y = -Math.abs(a.velocity.y);
            a.position.y = f.y - 13;
            LWy(a, !1);
            break;
          case 1:
            a.velocity.y = Math.abs(a.velocity.y);
            a.position.y = f.y + b.height + 13;
            LWy(a, !1);
            break;
          case 2:
            a.velocity.x = -Math.abs(a.velocity.x);
            a.position.x = f.x - 13;
            LWy(a, !0);
            break;
          case 3:
            a.velocity.x = Math.abs(a.velocity.x), a.position.x = f.x + b.width +
              13, LWy(a, !0)
        }
        e === 13 && (a.velocity.x = -k.x, a.velocity.y = -k.y);
        VWy(a)
      }
    }, TWy = function (a, b, c, d, e) {
      let f = a.position.x, g = a.position.y;
      a.position.x < b ? f = b : a.position.x > b + d && (f = b + d);
      a.position.y < c ? g = c : a.position.y > c + e && (g = c + e);
      a = new _.Kl(a.position.x - f, a.position.y - g);
      if (_.xfb(a) <= 12) {
        if (a.x === 0 || Math.abs(a.x) < Math.abs(a.y)) return a.y < 0 ? 0 : 1;
        if (a.y === 0 || Math.abs(a.y) < Math.abs(a.x)) return a.x < 0 ? 2 : 3
      }
      return 4
    }, LWy = function (a, b) {
      const c = a.Eb.oa;
      a.Ba === 1 ? ((a.oa.LZb = b) ? (a.oa.u$c = c, a.velocity.x = KWy(a) * Math.sign(a.velocity.x)) :
        (a.oa.y$c = c, a.velocity.y = KWy(a) * Math.sign(a.velocity.y)), a.oa.Sbb = a.oa.LZb ? a.velocity.x > 0 ? Math.PI : 0 : a.velocity.y > 0 ? Math.PI * 3 / 2 : Math.PI / 2, a.oa.Z7b = -1) : a.Ba === 2 && (a.Aa.Lvc = c, a.Aa.UXa.x = a.position.x, a.Aa.UXa.y = a.position.y, a.Aa.qdd++)
    }, VWy = function (a) {
      a.Ba === 2 ? (O3.kQc.stop(), O3.kQc.play()) : a.Ba === 1 && (O3.DNc.stop(), O3.DNc.play())
    }, YWy = function (a, b, c) {
      var d = a.Da.getPosition(), e = a.Da.getSize(), f = e.width / 2;
      a.velocity.y > 0 && c > d.y - 12 && c < d.y + e.height && b >= d.x - f - 12 && b <= d.x + f + 12 && (b = (b - d.x) / f, e = Math.PI / 2 - b * (a.Eb.isMobile ? nWy : mWy), f = KWy(a), a.velocity.x = f * Math.cos(e), a.velocity.y = -f * Math.sin(e), a.position.y -= (c + 12 - d.y) * (1 - Math.min(1, Math.abs(b))), c = a.colorIndex, O3.CAd.play(), QVy(c), VWy(a), LWy(a, !1), a.Eb.Ba.has(3) && RWy(a), a.Eb.Ba.has(2) && (a.Ea = !0, Z3.sNc.play()), a.Eb.Ba.has(4) && (c = a.Pa, a = a.colorIndex, d = c.Ba.getPosition(), b = c.Ba.getSize().width / 2, c.oa.add(new XWy(new _.Kl(d.x - b + 14, d.y - 4), c, c.Aa, a)), c.oa.add(new XWy(new _.Kl(d.x + b - 14, d.y - 4), c, c.Aa, a)), Z3.Xyd.play()))
    }, KWy = function (a) {
      return a.Eb.isMobile ? .35 + Math.max(0, Math.min(1, (a.Eb.Aa.height - 650) / 150)) * (.4 - .35) : .35
    }, RWy = function (a) {
      var b = a.Ca.Ca;
      if (b.x !== -1 && b.y !== -1) {
        var c = a.Ca.blockSize;
        b = new _.Kl(a.Ca.Aa.x + b.x * c.width + c.width / 2, a.Ca.Aa.y + b.y * c.height + c.height / 2);
        c = Math.atan2(b.y - a.position.y, b.x - a.position.x);
        const d = KWy(a);
        a.velocity.x = d * Math.cos(c);
        a.velocity.y = d * Math.sin(c);
        a.Ba === 1 && (a.oa.Z7b = b.x)
      }
    }, IWy = class {
      constructor(a, b, c, d, e, f, g, h, k) {
        this.Na = a;
        this.Da = b;
        this.Ca = c;
        this.Pa = d;
        this.Qa = e;
        this.QI = f;
        this.Eb = g;
        this.colorIndex = h;
        this.Ba = k;
        this.Ea = this.La =
          this.Ha = !1;
        this.Ga = 1;
        this.Aa = {i2b: !1, Lvc: 0, qdd: 0, UXa: new _.Kl(0, 0)};
        this.oa = {LZb: !1, u$c: 0, y$c: 0, wB: 0, Sbb: 0, Z7b: -1};
        this.position = new _.Kl(0, 0);
        this.velocity = new _.Kl(0, 0);
        this.xya = this.Eb.oa;
        k === 2 && (this.Aa.i2b = R3());
        QWy(this)
      }

      update(a) {
        if (this.Ha) {
          var b = this.Eb.ica;
          this.Ga = 1;
          if (this.Eb.Ba.has(1) && this.velocity.y > 0) {
            var c = Math.abs(this.position.x - this.Da.getPosition().x);
            c = .5 + Math.max(0, Math.min(1, c / (this.Eb.Aa.width / 4))) * .5;
            var d = Math.abs(this.position.y - this.Da.getPosition().y);
            this.Ga = 1 - .85 * c *
              (1 - Math.max(0, Math.min(1, d / (this.Eb.isMobile ? 250 : 225))));
            c = EWy(this.Eb, 1);
            c <= 3E3 && (c = 1 - Math.max(0, c / 3E3), this.Ga = this.Ga * (1 - c) + c)
          }
          c = this.Ea ? 1.5 : 1;
          d = this.Eb.oa;
          this.Ea && DWy(this.QI, new HWy(d, 20 / b, pWy, this.position.clone(), new _.Kl(-$3.width / 2, -$3.height / 2), this.colorIndex, "./images/block_breaker/v2/balls.png"));
          const g = this.La ? Math.min(1, (d - this.xya) / 2500) : 1, h = this.Ba === 0 ? .85 : 1;
          var e = this.Ba === 1;
          d = e ? Math.min(this.oa.LZb ? 1.25 : 1, (this.Eb.oa - this.oa.u$c) / 1200) : 1;
          const k = e ? Math.min(this.oa.LZb ?
            1 : 1.25, (this.Eb.oa - this.oa.y$c) / 1200) : 1;
          e && this.oa.Z7b !== -1 && (d *= Math.min(1, Math.abs(this.position.x - this.oa.Z7b) / (this.Ca.blockSize.width / 2)));
          if (e = this.Ba === 2) this.position.x = this.Aa.UXa.x, this.position.y = this.Aa.UXa.y;
          b = a * (b * g + (1 - g)) * this.Ga * c * h * (e ? .75 : 1);
          this.position.x += b * d * this.velocity.x;
          this.position.y += b * k * this.velocity.y;
          e && (this.Aa.UXa.x = this.position.x, this.Aa.UXa.y = this.position.y, b = Math.atan2(this.velocity.y, this.velocity.x) + Math.PI / 2, d = this.Eb.oa - this.Aa.Lvc, c = Math.sin(d * .0075) * (this.Aa.qdd %
          2 === 0 ? 1 : -1), d = 25 * Math.min(1, d / 100) * this.Ga, this.position.x += c * Math.cos(b) * d, this.position.y += c * Math.sin(b) * d)
        } else QWy(this);
        WWy(this);
        b = !1;
        this.position.y < 12 && (this.position.y = 12, this.velocity.y = Math.abs(this.velocity.y), b = !0, this.Ea = !1, LWy(this, !1));
        c = this.Eb.Aa;
        this.Ba === 0 ? this.position.x < 0 && this.velocity.x < 0 ? (this.position.x += c.width, O3.tQb.stop(), O3.tQb.play()) : this.position.x > c.width && this.velocity.x > 0 && (this.position.x -= c.width, O3.tQb.stop(), O3.tQb.play()) : this.position.x < 12 ? (this.position.x =
          12, this.velocity.x = Math.abs(this.velocity.x), b = !0, LWy(this, !0)) : this.position.x > c.width - 12 && (this.position.x = c.width - 12, this.velocity.x = -Math.abs(this.velocity.x), b = !0, LWy(this, !0));
        b && (QVy(this.colorIndex), VWy(this));
        YWy(this, this.position.x, this.position.y);
        b = this.Eb.Aa;
        this.Ba === 0 && (this.position.x < 12 ? YWy(this, this.position.x + b.width, this.position.y) : this.position.x > b.width - 12 && YWy(this, this.position.x - b.width, this.position.y));
        for (var f of this.Qa.oa) if (b = f.getPosition(), c = f.getWidth() / 2, this.velocity.y >
        0 && this.position.y > b.y - 12 && this.position.y < b.y + qWy.height && this.position.x >= b.x - c - 12 && this.position.x <= b.x + c + 12) {
          this.velocity.y = -this.velocity.y;
          this.position.y = b.y - 12;
          QVy(this.colorIndex);
          VWy(this);
          LWy(this, !1);
          f.oa = !0;
          Z3.zPc.play();
          break
        }
        this.Ba === 1 && (f = this.oa.Sbb - this.oa.wB, Math.abs(f) > Math.PI && (f = f < 0 ? f + Math.PI * 2 : f - Math.PI * 2), b = Math.sign(f), Math.abs(f) === Math.PI && (b = R3() ? 1 : -1), this.oa.wB += Math.min(Math.abs(f), .01 * a * this.Eb.ica) * b, this.oa.wB < 0 && (this.oa.wB += Math.PI * 2));
        this.position.y > this.Eb.Aa.height +
        12 && (a = this.Na, a.oa.delete(this), DWy(a.QI, new HWy(a.Eb.oa, 40, tWy, new _.Kl(this.getPosition().x, a.Eb.Aa.height), uWy, this.colorIndex, "./images/block_breaker/v2/effect.png", R3())), O3.uud.play())
      }

      getPosition() {
        return this.position
      }

      setPosition(a) {
        this.position.x = a.x;
        this.position.y = a.y;
        this.Ha = !0;
        this.Ba === 2 && (this.Aa.UXa.x = this.position.x, this.Aa.UXa.y = this.position.y, this.Aa.Lvc = this.Eb.oa)
      }
    };
    var ZWy = function (a, b, c) {
      a.Iv.delete(b);
      c && (DWy(a.QI, new HWy(a.Eb.oa, 40, tWy, new _.Kl(b.getPosition().x, a.oa.getPosition().y), uWy, b.colorIndex + 1, "./images/block_breaker/v2/effect.png")), b.Aa())
    }, $Wy = class {
      constructor(a, b, c) {
        this.oa = a;
        this.QI = b;
        this.Eb = c;
        this.Iv = new Set;
        this.reset()
      }

      reset() {
        this.Iv.clear()
      }

      update(a) {
        for (const b of this.Iv) b.update(a)
      }
    }, bXy = class {
      constructor(a, b, c, d, e) {
        this.position = a;
        this.Iv = b;
        this.Da = c;
        this.colorIndex = d;
        this.Eb = e;
        this.startTime = this.Eb.oa
      }

      update(a) {
        const b =
          this.Da.getPosition();
        var c = this.Da.getSize();
        const d = c.width / 2;
        c = c.height / 2;
        const e = xWy.width / 2, f = xWy.height / 2;
        this.position.x - e < b.x + d && this.position.x + e > b.x - d && this.position.y - f < b.y + c && this.position.y + f > b.y && (this.Da.Aa = 1800, ZWy(this.Iv, this, !0));
        this.position.y > this.Eb.Aa.height + Q3.height && (ZWy(this.Iv, this, !1), aXy(this.Eb, 25));
        this.Ca(a, (this.Eb.ica + 2) / 3)
      }

      Ca() {
      }

      oa() {
        return ""
      }

      getPosition() {
        return this.position
      }

      getStartTime() {
        return this.startTime
      }

      Aa() {
      }
    }, cXy = class extends bXy {
      constructor(a, b, c,
                  d, e) {
        super(a, b, c, d, e);
        this.Ba = this.elapsedTime = 0;
        this.Ea = R3();
        this.Ga = this.getPosition().x
      }

      Ca(a, b) {
        this.elapsedTime += a * b;
        const c = this.getPosition();
        this.Ba = Math.sin(this.elapsedTime * .0025) * (this.Ea ? -1 : 1);
        c.x = this.Ga + this.Ba * (this.Eb.isMobile ? 30 : 40);
        c.y += .15 * a * b * (1 - .25 * Math.abs(this.Ba))
      }

      oa() {
        return "./images/block_breaker/v2/spore.png"
      }

      Aa() {
        hWy.Pzd.play()
      }
    }, dXy = class extends bXy {
      constructor(a, b, c, d, e) {
        super(a, b, c, d, e);
        b = this.Eb.Aa;
        this.velocity = new _.Kl((this.Eb.isMobile ? .04 :
          .05) * (a.x < b.width / 3 ? 1 : a.x > 2 * b.width / 3 ? -1 : R3() ? 1 : -1), -.15)
      }

      Ca(a, b) {
        a *= b;
        this.velocity.y += 2.5E-4 * a;
        b = this.getPosition();
        b.x += this.velocity.x * a;
        b.y += this.velocity.y * a
      }

      oa() {
        return "./images/block_breaker/v2/acid.png"
      }

      Aa() {
        hWy.mMc.play()
      }
    }, eXy = class extends bXy {
      constructor(a, b, c, d, e) {
        super(a, b, c, d, e);
        this.angle = this.Ba = 0;
        this.angle = Math.random() * 2 * Math.PI;
        this.Ea = R3() ? 1 : -1;
        this.i2b = R3()
      }

      Ca(a, b) {
        a *= b;
        this.Ba += 2.5E-4 * a;
        this.getPosition().y += this.Ba * a;
        this.angle += .005 * a * this.Ea;
        this.angle <
        0 ? this.angle += 2 * Math.PI : this.angle > 2 * Math.PI && (this.angle %= 2 * Math.PI)
      }

      oa() {
        return "./images/block_breaker/v2/rubble.png"
      }

      Aa() {
        hWy.Lud.play()
      }
    };
    var UWy = function (a, b, c, d = !1) {
      if (fXy(a, b)) return 0;
      const e = a.oa[b.x][b.y].V3, f = a.oa[b.x][b.y].Alb;
      f || (gXy(a, b, d), e === 5 && c && (a.oa[b.x][b.y].y5a.K3c = !0, a.oa[b.x][b.y].y5a.thc = !0));
      return f ? 0 : e
    }, gXy = function (a, b, c) {
      if (!a.oa[b.x][b.y].Alb) {
        var d = b.y, e = a.oa[b.x][b.y].V3, f = void 0, g = !1;
        switch (e) {
          default:
            g = !0;
            break;
          case 9:
            f = 10;
            RVy(d);
            P3.Jud.play();
            break;
          case 7:
            f = 8;
            var h = a.oa[b.x][b.y].Nhb;
            RVy(d);
            var k = P3.SPc.play();
            h.bWc = k;
            break;
          case 5:
            return
        }
        f && (a.oa[b.x][b.y].V3 = f);
        if (g) {
          a.oa[b.x][b.y].Alb = !0;
          a.oa[b.x][b.y].Qec =
            a.Eb.oa;
          a.oa[b.x][b.y].xTc = c;
          aXy(a.Eb, 50);
          switch (e) {
            case 1:
            case 6:
              RVy(d);
              break;
            case 3:
              RVy(d);
              switch (d) {
                case 0:
                  P3.Eud.play();
                  break;
                case 1:
                  P3.bBd.play();
                  break;
                case 2:
                  P3.kEd.play();
                  break;
                case 3:
                  P3.zxd.play()
              }
              break;
            case 2:
              RVy(d);
              P3.Exd.play();
              break;
            case 4:
              RVy(d);
              P3.Mzd.play();
              break;
            case 8:
              P3.RPc.play();
              break;
            case 13:
              switch (d) {
                case 0:
                  P3.Dud.play();
                  break;
                case 1:
                  P3.ZAd.play();
                  break;
                case 2:
                  P3.iEd.play();
                  break;
                case 3:
                  P3.yxd.play()
              }
              break;
            case 10:
              RVy(d);
              P3.Kud.play();
              break;
            case 12:
              RVy(d);
              P3.qtd.play();
              break;
            case 11:
              RVy(d), P3.Ozd.play()
          }
          c = void 0;
          if (e === 4) a.Ga(new _.Kl(a.Aa.x + b.x * a.blockSize.width + a.blockSize.width / 2, a.Aa.y + b.y * a.blockSize.height + a.blockSize.height / 2), b.y + 1, a.oa[b.x][b.y].Ccd.nnd); else if (e === 3) {
            var l = a.La;
            l.oa.add(new hXy(new _.Kl(a.Aa.x + b.x * a.blockSize.width + a.blockSize.width / 2, a.Aa.y + b.y * a.blockSize.height + a.blockSize.height / 2), l, l.Aa, b.y, l.Eb))
          } else if (e === 2) l = a.Ea, l.oa.add(new iXy(new _.Kl(a.Aa.x + b.x * a.blockSize.width + a.blockSize.width / 2, a.Aa.y + b.y * a.blockSize.height + a.blockSize.height /
            2), l, l.Aa, b.y, l.Eb)); else if (e === 8) {
            for (l of oWy) e = new _.Kl(b.x + l.x, b.y + l.y), fXy(a, e) || (UWy(a, e, !1, !0), jXy(a, new _.Kl(a.Aa.x + e.x * a.blockSize.width + a.blockSize.width / 2, a.Aa.y + e.y * a.blockSize.height + a.blockSize.height / 2), a.Eb.oa, b.y + 1));
            jXy(a, new _.Kl(a.Aa.x + b.x * a.blockSize.width + a.blockSize.width / 2, a.Aa.y + b.y * a.blockSize.height + a.blockSize.height / 2), a.Eb.oa, b.y + 1);
            l = a.oa[b.x][b.y].Nhb.bWc;
            l !== -1 && P3.SPc.stop(String(l));
            P3.RPc.play()
          } else e === 11 ? c = cXy : e === 10 ? c = eXy : e === 12 && (c = dXy);
          c && (l = a.Iv, l.Iv.add(new c(new _.Kl(a.Aa.x +
            b.x * a.blockSize.width + a.blockSize.width / 2, a.Aa.y + b.y * a.blockSize.height + a.blockSize.height / 2), l, l.oa, b.y, l.Eb)))
        }
      }
    }, fXy = function (a, b) {
      return b.x < 0 || b.x >= a.oa.length || b.y < 0 || b.y >= a.oa[0].length
    }, jXy = function (a, b, c, d) {
      DWy(a.QI, new HWy(c + Math.random() * 400, 40, vWy, new _.Kl(b.x, b.y), wWy, d, "./images/block_breaker/v2/explosion.png", R3(), R3()))
    }, kXy = class {
      constructor(a, b, c, d, e, f) {
        this.Ha = a;
        this.La = b;
        this.Ea = c;
        this.Iv = d;
        this.QI = e;
        this.Eb = f;
        this.oa = [];
        this.Ga = null;
        this.Ba = new _.Nl(0, 0);
        this.oa = [];
        this.Aa = new _.Kl(0, 0);
        this.Da = new _.Kl(0, 0);
        this.blockSize = new _.Nl(0, 0);
        this.Ca = new _.Kl(-1, -1)
      }

      update(a) {
        this.Aa.y < this.Da.y && (this.Aa.y += (this.Da.y - this.Aa.y) * .0015 * a);
        this.Aa.y > this.Da.y && (this.Aa.y = this.Da.y);
        var b = this.Ca.clone();
        this.Ca.x = -1;
        this.Ca.y = -1;
        let c = Infinity;
        const d = this.Ha.getPosition();
        let e = 0;
        for (let f = 0; f < this.Ba.width; f++) for (let g = 0; g < this.Ba.height; g++) {
          const h = this.oa[f][g];
          if (!h.Alb && !h.q_c && (e++, this.Eb.Ba.has(3))) {
            const k = _.Ll(new _.Kl(this.Aa.x + f * this.blockSize.width +
              this.blockSize.width / 2, this.Aa.y + g * this.blockSize.height + this.blockSize.height / 2), d);
            k < c && (c = k, this.Ca.x = f, this.Ca.y = g)
          }
          h.V3 === 5 ? h.y5a.thc = !1 : h.V3 === 8 && (h.Nhb.B8b -= a, h.Nhb.B8b <= 0 && gXy(this, new _.Kl(f, g), !0))
        }
        !this.Eb.Ba.has(3) || this.Ca.x === b.x && this.Ca.y === b.y || Z3.yud.play();
        e === 0 && (a = this.Eb, a.level++, b = a.isMobile ? 2.5 : 2, a.ica < 1.5 ? a.ica += .1 : a.ica < b && (a.ica = Math.min(b, a.ica + .05)), this.reset(!0), P3.czd.play())
      }

      reset(a) {
        var b = this.Eb.Aa;
        this.Ba.height = TVy.height;
        var c = a4.width + 4;
        this.Ba.width = this.Eb.isMobile ?
          Math.floor((b.width - 4) / c) : TVy.width;
        this.blockSize = new _.Nl(c, a4.height + 4);
        this.Aa = new _.Kl((b.width - this.blockSize.width * this.Ba.width) / 2, this.Eb.isMobile ? 80 : 60);
        this.Da = this.Aa.clone();
        this.Ca = new _.Kl(-1, -1);
        this.oa = [];
        b = [];
        for (c = 0; c < this.Ba.width; c++) {
          this.oa.push([]);
          for (var d = 0; d < this.Ba.height; d++) this.oa[c].push({
            V3: 1,
            Qec: -1,
            Alb: !1,
            q_c: !1,
            xTc: !1
          }), b.push(new _.Kl(c, d))
        }
        for (c = b.length; c > 0; c--) d = b.splice(Math.floor(Math.random() * c), 1)[0], b.push(d);
        d = this.Ba.width * this.Ba.height;
        var e = d / (TVy.width *
          TVy.height);
        c = [];
        c.push(4);
        c.push(3);
        var f = this.Eb.getLevel();
        f === 1 ? (c.push(4), c.push(3)) : this.Eb.isMobile || c.push(R3() ? 4 : 3);
        var g = this.Eb.kb, h = this.Eb.Ca + this.Ea.oa.size;
        f % 2 === 0 && h < 3 && g < 3 && c.push(2);
        g = [5, 13, 7];
        h = [9, 11, 12];
        e = Math.ceil(d * Math.min((f + 1) * .05 * e, 1));
        f = Math.min(f * .05, .25);
        let k = 0;
        for (let n = 0; n < e && !(c.length >= d); n++) {
          var l = n < e * f ? h : g;
          l = l[Math.floor(Math.random() * l.length)];
          c.push(l);
          l === 7 && (k++, k === 3 && g.pop())
        }
        for (d = 0; d < c.length; d++) this.oa[b[d].x][b[d].y].V3 = c[d], c[d] === 4 ? (g = Math.min(.1,
          .01 + (this.Eb.getLevel() - 1) * .01), this.oa[b[d].x][b[d].y].Ccd = {nnd: this.Eb.getLevel() > 1 && Math.random() < g}) : c[d] === 5 ? this.oa[b[d].x][b[d].y].y5a = {
          K3c: !1,
          thc: !1,
          zod: -1
        } : c[d] === 7 && (this.oa[b[d].x][b[d].y].Nhb = {B8b: 1E3, bWc: -1});
        this.Aa.y = a ? -this.blockSize.height * this.oa[0].length : this.Da.y
      }
    };
    var EWy = function (a, b) {
      let c;
      return (c = a.Ba.get(b)) != null ? c : 0
    }, OWy = function (a) {
      return a.Ea >= 0 && a.Sa >= 0
    }, PWy = function (a, b) {
      a.Ea < 0 && (a.Ea = a.oa + 500);
      b && a.Sa < 0 && (a.Sa = a.oa)
    }, aXy = function (a, b) {
      a.jh += b;
      if (a.jh > a.uw) {
        a.uw = a.jh;
        a.Wa = !0;
        let c;
        (c = a.localStorage) == null || c.set("bbhs", a.uw)
      }
    }, lXy = function (a) {

      if (a.isMobile) {
        var b = Math.min(495, a.Ga.canvas.width);
        a.Aa = new _.Nl(b, Math.round(a.Ga.canvas.height * b / a.Ga.canvas.width))
      } else a.Aa = jWy;
      b = a.Na;
      a = a.Aa;
      b.Aa.width = a.width;
      b.Aa.height = a.height
    }, mXy = function (a) {
      a.Da &&
      ((0, _.Mo)(a.Da), a.Da = null)
    }, MWy = function (a, b) {
      a.Sj || (a.Sj = !0, PWy(a, !0), mXy(a), a.Ha.style.display = "", a.Da = (0, _.Lo)(() => {
          a.Ha.style.opacity = "1";
          a.Fb.textContent = a.d5a();
          a.yb.textContent = a.uw.toString().padStart(5, "0");
          if (a.La !== null) {
            var c = "";
            a.jh > 0 && (c = _.hE(new _.gE("I scored {SCORE} points in #GoogleBlockBreaker!"), {SCORE: String(a.jh)}));
            var d = a.La.cE();
            d.setTitle(c);
            a.La.oa(d)
          }
          a.Wa && (a.yb.classList.add("Uhdybb"), a.Wa = !1);
          dWy.PPb.stop();
          dWy.PPb.play(0, !0);
          a.Ya.focus();
          _.Cv([new _.Go(a.Ya, "show")])
        },
        b ? 1E3 : 0))
    }, oXy = class {
      // game init
      constructor(a, b, c, d, e, f, g) {
        this.isMobile = a;
        this.Ga = b;
        this.Na = c;
        this.Ya = d;
        this.Ha = e;
        this.Fb = f;
        this.yb = g;
        this.Aa = new _.Nl(0, 0);
        this.Db = 1;
        this.oa = Date.now();
        this.Sa = this.Ea = -1;
        this.uw = this.jh = 0;
        this.Wa = !1;
        this.Ca = 3;
        this.Qa = 0;
        this.Pa = -1;
        this.Va = [0, 0, 0];
        this.kb = 0;
        this.ica = this.level = 1;
        this.Sj = !1;
        this.Ba = new Map;
        this.La = this.Da = null;
        lXy(this);
        this.localStorage = _.Be("l") ? _.sf("l", ZVy) : null;
        let h;
        if ((h = this.localStorage) == null ? 0 : h.has("bbhs")) this.uw = this.localStorage.get("bbhs")
      }

      reset() {
        this.oa = Date.now();
        this.jh = 0;
        this.Wa = !1;
        this.Ca = 3;
        this.Qa = 0;
        this.Pa = -1;
        this.Va = [0, 0, 0];
        this.kb = 0;
        this.ica = this.level = 1;
        this.Sj = !1;
        this.Ba.clear();
        mXy(this);
        this.Ha.style.opacity = "0";
        this.Da = (0, _.Lo)(() => {
          this.Ha.style.display = "none";
          this.yb.classList.remove("Uhdybb")
        }, 100);
        dWy.PPb.stop();
        _.Cv([new _.Go(this.Ya, "hide")])
      }

      update(a) {
        for (const b of this.Ba.keys()) {
          const c = this.Ba.get(b) - a;
          if (c <= 0) {
            this.Ba.delete(b);
            switch (b) {
              case 0:
                Z3.EAd.play();
                break;
              case 1:
                Z3.ezd.play();
                break;
              case 2:
                Z3.Rwd.play();
                break;
              case 3:
                Z3.MCd.play();
                break;
              case 4:
                Z3.Yyd.play();
                break;
              case 5:
                Z3.zPc.play()
            }
            b === 5 && nXy(this.Na)
          } else b === 5 && this.Na.oa.size === 0 ? this.Ba.delete(b) : this.Ba.set(b, c)
        }
      }

      d5a() {
        return this.jh.toString().padStart(5, "0")
      }

      getLevel() {
        return this.level
      }
    };
    var pXy = function (a, b, c) {
      a.oa.delete(b);
      c && (DWy(a.QI, new HWy(a.Eb.oa, 40, tWy, new _.Kl(b.getPosition().x, a.Eb.Aa.height), uWy, b.colorIndex + 1, "./images/block_breaker/v2/effect.png", R3())), Z3.INc.play())
    }, qXy = class {
      constructor(a, b, c) {
        this.Aa = a;
        this.QI = b;
        this.Eb = c;
        this.oa = new Set;
        this.reset()
      }

      reset() {
        this.oa.clear()
      }

      update(a) {
        for (const b of this.oa) b.update(a)
      }
    }, iXy = class {
      constructor(a, b, c, d, e) {
        this.position = a;
        this.Da = b;
        this.Ca = c;
        this.colorIndex = d;
        this.Eb = e;
        this.velocity = new _.Kl(0,
          0);
        this.Aa = !1;
        this.Ba = -1;
        this.angle = this.oa = 0;
        this.velocity.y = .15
      }

      update(a) {
        if (!this.Aa) {
          a *= (this.Eb.ica + 2) / 3;
          this.oa > 0 && (this.velocity.y += 2.5E-4 * a);
          this.position.x += this.velocity.x * a;
          this.position.y += this.velocity.y * a;
          this.angle += this.velocity.x * a * .05;
          this.angle < 0 ? this.angle += 2 * Math.PI : this.angle > 2 * Math.PI && (this.angle %= 2 * Math.PI);
          if (!(this.velocity.y <= 0)) {
            a = this.Ca.getPosition();
            var b = this.Ca.getSize(), c = b.width / 2, d = Q3.width / 2;
            if (this.position.x - d < a.x + c && this.position.x + d > a.x - c && this.position.y -
              d < a.y + b.height && this.position.y + d > a.y) if (this.oa < 3) {
              this.velocity.x = (.5 + Math.random() * .5) * .175 * (R3() ? -1 : 1);
              this.velocity.y = -.25 + this.oa * -.05;
              switch (this.oa) {
                case 0:
                  Z3.Fxd.play();
                  break;
                case 1:
                  Z3.Gxd.play();
                  break;
                case 2:
                  Z3.Hxd.play()
              }
              this.oa++
            } else a = this.Eb, a.Va[a.Ca] = this.colorIndex + 1, a.Ca += 1, a.Qa = 1, a.kb++, a.Pa = a.oa, aXy(this.Eb, 250), this.Aa = !0, this.Ba = this.Eb.oa, rXy(this.Ca, this.colorIndex, this.position.x, !0), Z3.Ixd.play()
          }
          a = Q3.width / 2;
          b = this.Eb.Aa;
          this.position.x < a ? (this.position.x = a, this.velocity.x =
            Math.abs(this.velocity.x)) : this.position.x > b.width - a && (this.position.x = b.width - a, this.velocity.x = -Math.abs(this.velocity.x))
        }
        this.position.y > this.Eb.Aa.height + Q3.height / 2 && pXy(this.Da, this, !0)
      }

      getPosition() {
        return this.position
      }
    };
    var sXy = function (a, b, c) {
      a.oa.delete(b);
      c && (DWy(a.QI, new HWy(a.Eb.oa, 40, tWy, new _.Kl(b.getPosition().x, b.getPosition().y), uWy, b.colorIndex, "./images/block_breaker/v2/effect.png", R3(), !0)), Z3.Wyd.play())
    }, tXy = class {
      constructor(a, b, c, d) {
        this.Ba = a;
        this.Aa = b;
        this.QI = c;
        this.Eb = d;
        this.oa = new Set
      }

      reset() {
        this.oa.clear()
      }

      update(a) {
        for (const b of this.oa) b.update(a)
      }
    }, XWy = class {
      constructor(a, b, c, d) {
        this.position = a;
        this.Aa = b;
        this.oa = c;
        this.colorIndex = d
      }

      update(a) {
        this.position.y += a * -.5;
        var b = this.oa.oa, c = this.oa.Aa;
        const d = this.oa.blockSize;
        a = new _.Kl(Math.floor((this.position.x - c.x) / d.width), Math.floor((this.position.y - c.y) / d.height));
        a.x >= 0 && a.x < b.length && a.y >= 0 && a.y < b[a.x].length && !b[a.x][a.y].Alb && (b = new _.Nl(d.width - 4, d.height - 4), c = new _.Kl(c.x + a.x * d.width + d.width / 2, c.y + a.y * d.height + d.height / 2), Math.abs(this.position.x - c.x) > b.width / 2 || Math.abs(this.position.y - c.y) > b.height / 2 || UWy(this.oa, a, !1) !== 5 && sXy(this.Aa, this, !0));
        this.position.y < -BWy.height && sXy(this.Aa, this, !1)
      }

      getPosition() {
        return this.position
      }
    };
    var rXy = function (a, b, c, d) {
      a.Ba = 1500;
      a.Ca = b;
      a.Da = c - a.position.x;
      for (const e of AWy) a.oa.push({Hgb: e, colorIndex: b, y3d: d})
    }, uXy = class {
      constructor(a, b) {
        this.QI = a;
        this.Eb = b;
        this.position = new _.Kl(0, 0);
        this.size = new _.Nl(0, 0);
        this.Ba = this.Aa = this.cG = 0;
        this.Ca = -1;
        this.Da = 0;
        this.oa = [];
        this.reset()
      }

      reset() {
        const a = this.Eb.Aa;
        this.position.x = a.width / 2;
        this.position.y = a.height - (this.Eb.isMobile ? Math.round(50 + Math.max(0, Math.min(1, (a.height - 650) / 150)) * 100) : 50);
        this.size.width = this.Eb.isMobile ? 100 : 120;
        this.size.height = 12;
        this.Ba = this.Aa = this.cG = 0;
        this.Ca = -1;
        this.Da = 0;
        this.oa = []
      }

      update(a, b, c) {
        var d = this.Eb.ica;
        const e = this.Eb.isMobile, f = !e;
        if (f && b === 0 || e && (c === -1 || Math.abs(c - this.position.x) < 1)) b = Math.sign(this.cG), this.cG += .0035 * a * (Math.sign(this.cG) * -1) * d, Math.sign(this.cG) !== b && (this.cG = 0); else {
          if (f) {
            if (this.cG > 0 && b === 1 || this.cG < 0 && b === 2) this.cG = 0
          } else e && (this.cG > 0 && c < this.position.x || this.cG < 0 && c > this.position.x) && (this.cG = 0);
          this.cG += .005 * a * (f ? b === 1 ? -1 : 1 : c < this.position.x ? -1 : 1);
          this.Eb.Ea >= 0 || PWy(this.Eb,
            !1)
        }
        this.cG = Math.min(Math.abs(this.cG), (this.Eb.isMobile ? .4 : .5) * d * Math.pow(1 - this.Aa / 1800, 1.5)) * Math.sign(this.cG);
        this.position.x += this.cG * a;
        d = this.Eb.Ba.has(0);
        b = this.Eb.isMobile ? 100 : 120;
        b = d ? b * 1.5 : b;
        c = d ? .15 : .05;
        d && this.size.width < b ? this.size.width = Math.min(b, this.size.width + c * a) : !d && this.size.width > b && (this.size.width = Math.max(b, this.size.width - c * a));
        d = this.Eb.Aa;
        this.position.x < this.size.width / 2 ? (this.position.x = this.size.width / 2, this.cG = Math.max(this.cG, 0)) : this.position.x > d.width - this.size.width /
          2 && (this.position.x = d.width - this.size.width / 2, this.cG = Math.min(this.cG, 0));
        this.Aa = Math.max(0, this.Aa - a);
        this.Ba = Math.max(0, this.Ba - a);
        for (d = 0; d < this.oa.length; d++) this.oa[d].Hgb -= a, this.oa[d].Hgb <= 0 && (DWy(this.QI, new HWy(this.Eb.oa, 50, yWy, new _.Kl(this.position.x + this.size.width / 2 * Math.random() * (R3() ? 1 : -1), this.position.y), zWy, (this.oa[d].y3d ? 2 : Math.random() < .75 ? 0 : 1) + this.oa[d].colorIndex * 3, "./images/block_breaker/v2/powerup_particles.png")), this.oa.splice(d, 1), d--)
      }

      getPosition() {
        return this.position
      }

      getSize() {
        return this.size
      }
    };
    var vXy = function (a, b, c) {
      a.oa.delete(b);
      c && (DWy(a.QI, new HWy(a.Eb.oa, 40, tWy, new _.Kl(b.getPosition().x, a.Eb.Aa.height), uWy, b.colorIndex + 1, "./images/block_breaker/v2/effect.png", R3())), Z3.INc.play())
    }, wXy = class {
      constructor(a, b, c) {
        this.Aa = a;
        this.QI = b;
        this.Eb = c;
        this.oa = new Set;
        this.reset()
      }

      reset() {
        this.oa.clear()
      }

      update(a) {
        for (const b of this.oa) b.update(a)
      }
    }, hXy = class {
      constructor(a, b, c, d, e) {
        this.position = a;
        this.Ca = b;
        this.Ba = c;
        this.colorIndex = d;
        this.Eb = e;
        this.oa = !1;
        this.Aa = -1
      }

      update(a) {
        if (!this.oa) {
          this.position.y += .15 * a * this.Eb.ica;
          a = this.Ba.getPosition();
          var b = this.Ba.getSize();
          const d = b.width / 2, e = Q3.width / 2;
          if (this.position.x - e < a.x + d && this.position.x + e > a.x - d && this.position.y - e < a.y + b.height && this.position.y + e > a.y) {
            a = this.Eb;
            b = new Set([0, 1, 2, 3, 4, 5]);
            for (var c of a.Ba.keys()) b.delete(c);
            c = Array.from(b);
            if (c.length === 0) aXy(a, 1E3); else {
              aXy(a, 100);
              c = c[Math.floor(Math.random() * c.length)];
              a.Ba.set(c, 2E4);
              switch (c) {
                case 0:
                  Z3.DAd.play();
                  break;
                case 1:
                  Z3.dzd.play();
                  break;
                case 2:
                  Z3.Pwd.play();
                  break;
                case 3:
                  Z3.LCd.play();
                  break;
                case 4:
                  Z3.Vyd.play();
                  break;
                case 5:
                  Z3.MBd.play()
              }
              c === 5 && (c = a.Na, c.oa.add(new xXy(c.Aa.width * sWy, c.Aa, c)), c.oa.add(new xXy(c.Aa.width * 3 * sWy, c.Aa, c)), c.oa.add(new xXy(c.Aa.width * 5 * sWy, c.Aa, c)))
            }
            switch (this.colorIndex) {
              case 0:
                Z3.Fud.play();
                break;
              case 1:
                Z3.cBd.play();
                break;
              case 2:
                Z3.lEd.play();
                break;
              case 3:
                Z3.FNc.play()
            }
            this.oa = !0;
            this.Aa = this.Eb.oa;
            rXy(this.Ba, this.colorIndex, this.position.x, !1)
          }
        }
        this.position.y > this.Eb.Aa.height + Q3.height / 2 && vXy(this.Ca, this, !0)
      }

      getPosition() {
        return this.position
      }
    };
    var nXy = function (a) {
      a.oa.forEach(b => {
        b.oa = !0
      })
    }, yXy = class {
      constructor() {
        this.oa = new Set;
        this.Aa = new _.Nl(0, 0);
        this.reset()
      }

      reset() {
        this.oa.clear()
      }

      update(a) {
        for (const b of this.oa) b.update(a)
      }
    }, xXy = class {
      constructor(a, b, c) {
        this.Aa = b;
        this.Ba = c;
        this.oa = !1;
        this.position = new _.Kl(a, this.Aa.height);
        this.width = this.Aa.width * sWy
      }

      update(a) {
        const b = this.oa ? this.Aa.height : this.Aa.height - 16;
        this.position.y += .1 * (this.oa ? 1 : -1) * a;
        this.oa && this.position.y > b ? this.Ba.oa.delete(this) : !this.oa && this.position.y < b && (this.position.y =
          b)
      }

      getPosition() {
        return this.position
      }

      getWidth() {
        return this.width
      }
    };
    var zXy = function (a, b, c) {
      b ? a.Ba.gwc = c : a.Ba.hEc = c;
      a.Ba.Rvc = c ? b ? 1 : 2 : b && a.Ba.hEc ? 2 : !b && a.Ba.gwc ? 1 : 0
    }, AXy = function (a, b, c, d) {
      a.JU.qsa = d ? -1 : b.clientX * a.Eb.Db;
      if (c) a.JU.fsb = 0; else if (d && a.JU.fsb > 0 && a.JU.fsb < 125 && !a.Eb.Sj) {
        a = a.Ca;
        for (const e of a.oa) SWy(e)
      }
    }, BXy = class {
      constructor(a, b, c, d, e, f) {
        this.Ba = {gwc: !1, hEc: !1, Rvc: 0};
        this.JU = {qsa: -1, fsb: 0};
        this.Ga = new yXy;
        this.Eb = new oXy(a, b, this.Ga, c, d, e, f);
        this.QI = new GWy(this.Eb);
        this.Aa = new uXy(this.QI, this.Eb);
        this.Ea = new wXy(this.Aa, this.QI, this.Eb);
        this.Da = new qXy(this.Aa, this.QI, this.Eb);
        this.Iv = new $Wy(this.Aa, this.QI, this.Eb);
        this.oa = new kXy(this.Aa, this.Ea, this.Da, this.Iv, this.QI, this.Eb);
        this.Ha = new tXy(this.Aa, this.oa, this.QI, this.Eb);
        this.Ca = new NWy(this.Aa, this.oa, this.Ea, this.Da, this.Ha, this.Ga, this.QI, this.Eb);
        a = this.oa;
        b = this.Ca.Ha.bind(this.Ca);
        a.Ga = b
      }

      reset() {
        // console.log('game reset');
        this.Eb.reset();
        this.Aa.reset();
        this.oa.reset(!1);
        this.Ca.reset();
        this.Ea.reset();
        this.Da.reset();
        this.Iv.reset();
        this.QI.reset();
        this.Ha.reset();
        this.Ga.reset();
        this.Eb.isMobile ? (this.JU.qsa = -1, this.JU.fsb = 0) : (this.Ba.gwc = !1, this.Ba.hEc = !1, this.Ba.Rvc = 0)
      }

      update(a) {
        if (!this.Eb.Sj) {
          this.Eb.update(a);
          this.QI.update();
          this.Aa.update(a, this.Ba.Rvc, this.JU.qsa);
          this.oa.update(a);
          this.Ca.update(a);
          this.Ea.update(a);
          this.Da.update(a);
          this.Iv.update(a);
          this.Ha.update(a);
          var b = this.oa;
          for (let c = 0; c < b.Ba.width; c++) for (let d = 0; d < b.Ba.height; d++) {
            const e = b.oa[c][d];
            e.V3 === 5 && e.y5a.K3c && !e.y5a.thc && (b.oa[c][d].V3 = 6, b.oa[c][d].y5a.zod = b.Eb.oa, P3.qxd.play())
          }
          this.Ga.update(a);
          this.Eb.isMobile && this.JU.qsa !== -1 && (this.JU.fsb +=
            a)
        }
      }

      qD(a, b) {
        switch (a.keyCode) {
          case 65:
          case 37:
            zXy(this, !0, b);
            break;
          case 68:
          case 39:
            zXy(this, !1, b);
            break;
          case 32:
          case 87:
          case 38:
            if (b && !this.Eb.Sj) {
              b = this.Ca;
              for (const c of b.oa) SWy(c)
            }
            break;
          default:
            return
        }
        a.preventDefault()
      }
    };
    var e4 = function (a, b) {
      return a.assets.get(b)
    }, f4 = function (a, b) {
      const c = new Image;
      c.src = b;
      c.complete ? a.assets.set(b, c) : _.vn(c, "load", () => {
        a.assets.set(b, c)
      })
    }, CXy = class {
      constructor() {
        this.assets = new Map
      }
    };
    var DXy = function (a, b, c, d, e, f, g, h, k) {
      a.oa.save();
      a.oa.translate(Math.round(e), Math.round(f));
      h && a.oa.scale(-1, 1);
      k !== 0 && a.oa.rotate(k);
      a.oa.drawImage(b, c * $3.width, d * $3.height, $3.width, $3.height, -12, -12, $3.width, $3.height);
      a.oa.restore();
      g < 1 && (b = e4(a.images, "./images/block_breaker/bubble_particles.png")) && (a.oa.globalAlpha = Math.min(.5, 1 - g), a.oa.drawImage(b, 70, 0, 32, 32, Math.round(e - 16), Math.round(f - 16), 32, 32), a.oa.globalAlpha = 1)
    }, EXy = class {
      constructor(a, b, c) {
        this.Aa = a;
        this.Ca = b;
        this.Ga = c;
        this.Ea = _.lm("canvas");
        this.oa = this.Ea.getContext("2d");
        this.Da = _.lm("canvas");
        this.Ba = this.Da.getContext("2d");
        this.Aa.Eb.isMobile || (a = this.Aa.Eb.Aa, this.Ea.width = a.width, this.Ea.height = a.height, this.Da.width = a.width, this.Da.height = a.height);
        this.images = new CXy;
        f4(this.images, "./images/block_breaker/v2/balls.png");
        f4(this.images, "./images/block_breaker/v2/blocks.png");
        f4(this.images, "./images/block_breaker/paddle.png");
        f4(this.images, "./images/block_breaker/background_gradient.png");
        f4(this.images, "./images/block_breaker/break_effect.png");
        f4(this.images, "./images/block_breaker/v2/effect.png");
        f4(this.images, "./images/block_breaker/v2/explosion.png");
        f4(this.images, "./images/block_breaker/v2/powerups.png");
        f4(this.images, "./images/block_breaker/v2/hearts.png");
        f4(this.images, "./images/block_breaker/v2/spore.png");
        f4(this.images, "./images/block_breaker/v2/acid.png");
        f4(this.images, "./images/block_breaker/v2/rubble.png");
        f4(this.images, "./images/block_breaker/marquee.png");
        f4(this.images, "./images/block_breaker/v2/powerup_particles.png");
        f4(this.images, "./images/block_breaker/v2/lasers.png");
        f4(this.images, "./images/block_breaker/bubble_particles.png");
        f4(this.images, "./images/block_breaker/warning.png");
        f4(this.images, this.Aa.Eb.isMobile ? "./images/block_breaker/mobile_tutorial.png" : "./images/block_breaker/desktop_tutorial.png")
      }

      render(a) {
        this.oa.fillStyle = "#1c181f";
        this.oa.fillRect(0, 0, this.oa.canvas.width, this.oa.canvas.height);
        this.Ca.clearRect(0, 0, this.Ca.canvas.width, this.Ca.canvas.height);
        this.oa.imageSmoothingEnabled = !1;
        this.Ba.imageSmoothingEnabled = !1;
        this.Ca.imageSmoothingEnabled = !1;
        const b = e4(this.images, "./images/block_breaker/background_gradient.png");
        if (b) {
          var c = this.Aa.Eb.Aa;
          this.oa.drawImage(b, 0, c.height - b.height, c.width, b.height)
        }
        if (this.Aa.Eb.isMobile) {
          const xd = e4(this.images, "./images/block_breaker/warning.png");
          if (xd) {
            var d = this.Aa.Eb.Aa, e = this.Aa.Aa.getPosition(), f = Math.round(e.y - 30), g = this.Aa.Iv.Iv;
            for (const vd of g) {
              const Hc = Math.max(0, Math.abs(vd.getPosition().x - e.x) - 100),
                qe = Math.max(0, Math.abs(vd.getPosition().y -
                  e.y) - 100), Ve = Math.max(0, 1 - Hc / d.width), zd = Math.max(0, 1 - qe / (d.height * 3 / 4)),
                Kd = vd.getPosition().y - (f - 30), pd = Kd > 0 ? Math.max(0, 1 - Kd / 30) : 1;
              this.oa.globalAlpha = Math.min(1, (a - vd.getStartTime()) / 1E3) * Ve * zd * pd;
              this.oa.drawImage(xd, 0, 0, 14, 14, Math.round(vd.getPosition().x - 7), f, 14, 14);
              this.oa.globalAlpha = 1
            }
          }
        }
        const h = e4(this.images, "./images/block_breaker/paddle.png");
        if (h) {
          var k = b4.height + c4.height, l = this.Aa.Ga.oa;
          for (const xd of l) {
            const vd = xd.getPosition(), Hc = Math.round(xd.getWidth()),
              qe = Math.round(vd.x - Hc / 2);
            this.oa.drawImage(h, 0, k, qWy.width, qWy.height, qe, vd.y, qWy.width, qWy.height);
            this.oa.fillStyle = "white";
            this.oa.fillRect(qe + qWy.width, vd.y, Hc - qWy.width * 2, qWy.height);
            this.oa.drawImage(h, qWy.width, k, qWy.width, qWy.height, qe + Hc - qWy.width, vd.y, qWy.width, qWy.height)
          }
        }
        const n = e4(this.images, "./images/block_breaker/v2/blocks.png"),
          r = e4(this.images, "./images/block_breaker/break_effect.png");
        if (n && r) {
          var t = this.Aa.oa, x = t.Ca, y = t.oa, F = t.Aa,
            I = t.blockSize;
          for (let xd = 0; xd < y.length; xd++) for (let vd = 0; vd < y[xd].length; vd++) {
            const Hc = y[xd][vd].xTc ? 250 : 80,
              qe = y[xd][vd].Qec >= 0 ? Math.floor(5 * (a - y[xd][vd].Qec) / Hc) : -1;
            if (qe >= 5) {
              y[xd][vd].q_c = !0;
              continue
            }
            const Ve = y[xd][vd].V3;
            let zd = SVy(Ve);
            if (Ve === 4 && y[xd][vd].Ccd.nnd) zd += 1; else if (Ve === 8) {
              const Ld = 1 / 3;
              zd += y[xd][vd].Nhb.B8b / 1E3 % Ld > Ld / 2 ? 1 : 0
            } else Ve === 12 && OWy(this.Aa.Eb) && (zd += Math.floor(a % 720 / 120));
            const Kd = vd, pd = Math.round(F.x + xd * I.width + 2), id = Math.round(F.y + vd * I.height + 2);
            this.oa.drawImage(n, zd *
              a4.width, Kd * a4.height, a4.width, a4.height, pd, id, a4.width, a4.height);
            Ve === 6 && (this.oa.globalAlpha = Math.max(0, Math.min(1, (a - y[xd][vd].y5a.zod) / 150)), this.oa.drawImage(n, SVy(1) * a4.width, Kd * a4.height, a4.width, a4.height, pd, id, a4.width, a4.height), this.oa.globalAlpha = 1);
            qe !== -1 && this.oa.drawImage(r, 0, qe * a4.height, a4.width, a4.height, pd, id, a4.width, a4.height);
            if (xd === x.x && vd === x.y) {
              const Ld = e4(this.images, "./images/block_breaker/marquee.png");
              if (!Ld) continue;
              const Bf = a4.width + 4, Df =
                a4.height + 4;
              this.oa.drawImage(Ld, 0, Math.floor(a % 600 / 200) * Df, Bf, Df, pd - 2, id - 2, Bf, Df)
            }
          }
        }
        this.Aa.QI.render(a, this.oa, this.images);
        const L = e4(this.images, "./images/block_breaker/v2/lasers.png");
        if (L) {
          var Q = this.Aa.Ha;
          for (const xd of Q.oa) {
            const vd = Math.floor(Math.random() * 3), Hc = R3();
            this.oa.save();
            this.oa.translate(Math.round(xd.getPosition().x), Math.round(xd.getPosition().y));
            Hc && this.oa.scale(-1, 1);
            this.oa.drawImage(L, vd * BWy.width, xd.colorIndex * BWy.height, BWy.width, BWy.height,
              -BWy.width / 2, 0, BWy.width, BWy.height);
            this.oa.restore()
          }
        }
        const X = e4(this.images, "./images/block_breaker/v2/powerups.png");
        if (X) {
          var aa = this.Aa.Ea;
          for (const xd of aa.oa) {
            const vd = this.Aa.oa, Hc = UVy(vd.Aa, vd.blockSize, xd.getPosition());
            Hc > 0 && (this.oa.globalAlpha = Hc, this.oa.drawImage(X, Q3.width * 4, 0, d4.width, d4.height, Math.round(xd.getPosition().x - d4.width / 2), Math.round(xd.getPosition().y - d4.height / 2), d4.width, d4.height), this.oa.globalAlpha = 1);
            let qe = 0;
            xd.oa && xd.Aa >= 0 && (qe = Math.floor(Math.max(0,
              a - xd.Aa) / 250 * 4));
            qe >= 4 ? vXy(xd.Ca, xd, !1) : this.oa.drawImage(X, qe * Q3.width, xd.colorIndex * Q3.height, Q3.width, Q3.height, Math.round(xd.getPosition().x - Q3.width / 2), Math.round(xd.getPosition().y - Q3.height / 2), Q3.width, Q3.height)
          }
        }
        const ia = e4(this.images, "./images/block_breaker/v2/hearts.png");
        if (ia) {
          var la = this.Aa.Da;
          for (const xd of la.oa) {
            const vd = this.Aa.oa, Hc = UVy(vd.Aa, vd.blockSize, xd.getPosition());
            Hc > 0 && (this.oa.globalAlpha = Hc, this.oa.drawImage(ia, 5 * Q3.width, 0, d4.width, d4.height,
              Math.round(xd.getPosition().x - d4.width / 2), Math.round(xd.getPosition().y - d4.height / 2), d4.width, d4.height), this.oa.globalAlpha = 1);
            let qe, Ve = 0;
            if (xd.Aa && xd.Ba >= 0) qe = 2 + Math.floor(Math.max(0, a - xd.Ba) / 250 * 3); else {
              const zd = YVy(xd.angle);
              qe = zd.gWb;
              Ve = zd.V4b
            }
            qe >= 5 ? pXy(xd.Da, xd, !1) : (this.oa.save(), this.oa.translate(Math.round(xd.getPosition().x), Math.round(xd.getPosition().y)), Ve !== 0 && this.oa.rotate(Ve), this.oa.drawImage(ia, qe * Q3.width, xd.colorIndex * Q3.height, Q3.width, Q3.height, Math.round(-Q3.width / 2), Math.round(-Q3.height /
              2), Q3.width, Q3.height), this.oa.restore())
          }
        }
        const ta = e4(this.images, "./images/block_breaker/v2/balls.png");
        if (ta) {
          var ra = this.Aa.Ca;
          for (const xd of ra.oa) {
            const vd = xd.Ba, Hc = vd !== null;
            let qe = 0;
            !xd.Ha && OWy(this.Aa.Eb) && (qe = Math.max(0, 3 - Math.floor((a - xd.xya) / 200 * 4)));
            let Ve = xd.colorIndex, zd = 0, Kd = !1;
            if (Hc) switch (vd) {
              case 0:
                Ve += 9;
                break;
              case 2:
                Ve += 13;
                const Bf = YVy(2 * Math.PI * ((a - xd.xya) % 1500 / 1500));
                qe = Bf.gWb;
                zd = Bf.V4b;
                Kd = xd.Aa.i2b;
                break;
              case 1:
                Ve += 17;
                const Df = YVy(xd.oa.wB);
                qe = Df.gWb;
                zd = Df.V4b
            }
            const pd = xd.getPosition().x, id = xd.getPosition().y, Ld = xd.Ga;
            DXy(this, ta, qe, Ve, pd, id, Ld, Kd, zd);
            if (vd === 0) {
              const Bf = this.Aa.Eb.Aa;
              pd < 12 ? DXy(this, ta, qe, Ve, pd + Bf.width, id, Ld, !1, 0) : pd > Bf.width - 12 && DXy(this, ta, qe, Ve, pd - Bf.width, id, Ld, !1, 0)
            }
          }
        }
        this.DYa(a);
        const ma = e4(this.images, "./images/block_breaker/paddle.png");

        if (ma) {
          this.Ba.clearRect(0, 0, this.Da.width, this.Da.height);
          var Ka = this.Aa.Aa, Ja = Ka.getSize(), ob = Ka.getPosition(), jb = Math.round(ob.x - Ja.width / 2),
            pb = Math.round(Ja.width);
          this.Ba.drawImage(ma, 0, 0, b4.width, b4.height, jb, ob.y, b4.width, b4.height);
          this.Ba.fillStyle = "white";
          var Nb = pb - b4.width * 2;
          this.Ba.fillRect(jb + b4.width, ob.y, Nb, Ja.height);
          this.Ba.drawImage(ma, b4.width, 0, b4.width, b4.height, jb + pb - b4.width, ob.y, b4.width, b4.height);
          var wb = EWy(this.Aa.Eb, 4);
          if (wb > 0) {
            const xd = rWy.height * (wb >= 19700 ? Math.min(1, (2E4 - wb) / 300) : 1) * (wb <= 300 ? Math.max(0, wb / 300) : 1),
              vd = rWy.width / 2;
            this.Ba.drawImage(ma, b4.width * 2, 0, rWy.width, rWy.height, jb + 14 - vd, ob.y - xd, rWy.width, rWy.height);
            this.Ba.drawImage(ma,
              b4.width * 2, 0, rWy.width, rWy.height, jb + pb - 14 - vd, ob.y - xd, rWy.width, rWy.height)
          }
          var cc = Ka.Ca, bc = 1 - Ka.Ba / 1500;
          if (bc > 0 && cc >= 0) {
            this.Ba.save();
            this.Ba.globalCompositeOperation = "source-atop";
            this.Ba.globalAlpha = 1 - Math.pow(bc, 2);
            const xd = this.Aa.Eb.Aa, vd = Math.round(xd.width * 3 * bc);
            this.Ba.translate(Math.round(Ka.position.x + Ka.Da), 0);
            this.Ba.fillStyle = kWy[cc];
            this.Ba.fillRect(Math.round(-vd / 2), 0, vd, xd.height);
            this.Ba.restore()
          }
          var hc = EWy(this.Aa.Eb, 2);
          if (hc > 0) {
            this.Ba.save();
            this.Ba.globalCompositeOperation = "destination-over";
            const xd = (.1 + (Math.sin(a / 150) + 1) / 2 * .35) * (hc >= 19700 ? Math.min(1, (2E4 - hc) / 300) : 1) * (hc <= 300 ? Math.max(0, hc / 300) : 1);
            this.Ba.globalAlpha = xd;
            const vd = jb - (c4.width - b4.width), Hc = ob.y - (c4.height - b4.height) / 2;
            this.Ba.drawImage(ma, 0, b4.height, c4.width, c4.height, vd, Hc, c4.width, c4.height);
            this.Ba.fillRect(vd + c4.width, Hc + 2, Nb, c4.height - 4);
            this.Ba.drawImage(ma, c4.width, b4.height, c4.width, c4.height, vd + c4.width + Nb, Hc, c4.width, c4.height);
            this.Ba.globalAlpha = xd / 2;
            this.Ba.fillRect(vd + c4.width, Hc, Nb,
              2);
            this.Ba.fillRect(vd + c4.width, Hc + c4.height - 2, Nb, 2);
            this.Ba.restore()
          }
          this.oa.save();
          var wc = Math.pow(1 - Ka.Aa / 1800, 1.5);
          wc < 1 && (this.oa.globalAlpha = .1 + .9 * wc);
          this.oa.drawImage(this.Da, 0, 0);
          this.oa.restore()
        }
        const sc = e4(this.images, "./images/block_breaker/v2/balls.png");
        if (sc) {
          var bd = this.Aa.Eb.Qa, Xc = this.Aa.Eb.Ca;
          for (let xd = 0; xd < 3; xd++) {
            const vd = xd < Xc, Hc = xd === Xc - 1, qe = xd === Xc, Ve = Math.max(0, a - this.Aa.Eb.Pa);
            let zd;
            OWy(this.Aa.Eb) && Ve < 200 && (Hc && bd > 0 || qe && bd < 0) ? (zd = Math.floor(Ve /
              200 * 4), bd < 0 && (zd = 3 - zd)) : zd = vd ? 3 : 0;
            this.oa.drawImage(sc, zd * $3.width, (5 + this.Aa.Eb.Va[xd]) * $3.height, $3.width, $3.height, 20 + xd * ($3.width + 6), 20, $3.width, $3.height)
          }
        }
        this.Ga.textContent = this.Aa.Eb.d5a();
        const fc = e4(this.images, this.Aa.Eb.isMobile ? "./images/block_breaker/mobile_tutorial.png" : "./images/block_breaker/desktop_tutorial.png")
        if (fc) {
          var fd = OWy(this.Aa.Eb);
          fd && (this.Ga.style.opacity = "1");
          var Cd = this.Aa.Eb.Ea, Bd = this.Aa.Eb.Sa, Zc = fd ? 1 - Math.min(1, (a - Bd) / 200) : 1;

          if (Zc !== 0) {
            var Pd = this.Aa.Eb.Aa, Md = Pd.height * .575;
            this.oa.save();
            this.oa.globalAlpha = .75 * Zc;
            this.oa.fillStyle = "#1c181f";
            this.oa.fillRect(0, 0, Pd.width, Md);
            var Yc = Cd >= 0 && a >= Cd && (Bd < 0 || Bd !== Cd) ? Math.min(1, (a - Cd) / 200) : 0;
            this.oa.translate(Math.round(Pd.width / 2), Math.round(Md));
            this.oa.globalAlpha = Yc < 1 ? Zc : 0;
            var Fe = fc.width / 2;
            this.oa.drawImage(fc, 0, 0, Fe, fc.height, Math.round(-Fe / 2), Math.round(-fc.height / 2), Fe, fc.height);
            this.oa.globalAlpha = Zc * Yc;
            this.oa.drawImage(fc, Fe, 0, Fe, fc.height, Math.round(-Fe / 2), Math.round(-fc.height / 2), Fe, fc.height);
            this.oa.restore()
          }
        }

        this.Ca.save();
        const ff = 1 / this.Aa.Eb.Db;

        //// console.log('scale', ff);

        this.Ca.scale(ff, ff);
        this.Ca.drawImage(this.Ea, 0, 0);
        this.Ca.restore()
      }

      DYa(a) {
        var b = this.Aa.Iv;
        for (const g of b.Iv) {
          b = e4(this.images, g.oa());
          if (!b) continue;
          var c = 0, d = !1;
          let h = 0;
          var e = 0, f = void 0;
          g instanceof cXy ? (e = g.Ba, c = Math.abs(e), c = c < .25 ? 0 : c < .75 ? 1 : 2, e > 0 && (d = !0), e = 3) : g instanceof dXy ? (f = g.velocity, c = Math.atan2(f.y, Math.abs(f.x)) * 180 / Math.PI, c = c < -20 ? 3 : c < 30 ? 2 : c < 75 ? 1 : 0, e = 4, f.x > 0 && (d = !0)) : g instanceof
            eXy && (d = YVy(g.angle), c = d.gWb, h = d.V4b, e = 2, d = g.i2b);
          f = c;
          const k = g.getStartTime();
          (a - k) % 500 >= 250 && (c += e);
          this.oa.save();
          this.oa.translate(Math.round(g.getPosition().x), Math.round(g.getPosition().y));
          d && this.oa.scale(-1, 1);
          h !== 0 && this.oa.rotate(h);
          d = this.Aa.oa;
          d = UVy(d.Aa, d.blockSize, g.getPosition());
          d > 0 && (this.oa.globalAlpha = d, this.oa.drawImage(b, e * 2 * Q3.width + f * d4.width, 0, d4.width, d4.height, Math.round(-d4.width / 2), Math.round(-d4.height / 2), d4.width, d4.height), this.oa.globalAlpha = 1);
          this.oa.drawImage(b,
            c * Q3.width, g.colorIndex * Q3.height, Q3.width, Q3.height, Math.round(-Q3.width / 2), Math.round(-Q3.height / 2), Q3.width, Q3.height);
          this.oa.restore()
        }
      }
    };
    var FXy = class extends _.Dg {
      static Ra() {
        return {service: {overlay: _.zz, we: _.Tu}}
      }

      constructor(a) {
        super(a.Oa);
        this.Da = this.isMuted = this.Db = !1;
        this.Ea = new aWy;
        this.Ga = new bWy;
        this.Na = new eWy;
        this.Pa = new fWy;
        this.Qa = new iWy;
        this.Ch = a.service.overlay;
        this.we = a.service.we;
        this.Ca = this.Fa("iQZRyc").qb();
        a = this.Fa("oglsb").Fd();
        this.Aa = a.getContext("2d");
        this.kb = this.Fa("SWXRH").qb();
        _.tp(this, this.Ca);
        const b = this.getData("isMobile").Hb();
        // GAME OVER POPUP
        // console.log('isMobile BXy', b);
        this.oa = new BXy(b, this.Aa, this.kb, this.Fa("Yfvsbd").qb(), this.Fa("AQkUuf").qb(),
          this.Fa("FmROf").qb());
        _.sp(this, "YOuPgf").then(c => {
          this.oa.Eb.La = c
        });
        this.Sa = new EXy(this.oa, this.Aa, this.Fa("xXFJX").qb());
        b ? (this.Ha = this.La = void 0, this.Li().listen(a, "touchstart", c => {
          AXy(this.oa, c, !0, !1);
          c.preventDefault()
        }), this.Li().listen(a, "touchmove", c => {
          AXy(this.oa, c, !1, !1);
          c.preventDefault()
        }), this.Li().listen(a, "touchend", c => {
          AXy(this.oa, c, !1, !0);
          c.preventDefault()
        }), this.we.addListener(() => {
          this.Ok() || (this.Ur(), this.Da && (this.Da = !1, this.oa.reset()))
        })) : (this.La = this.Fa("aJJKAc"), this.Ha =
          this.Fa("XUhlrf"), this.Li().listen(document, "keydown", c => {
          if (this.isOpen()) switch (c.keyCode) {
            case 70:
              this.toggleFullscreen();
              break;
            case 77:
              this.Ba();
              break;
            case 27:
              MWy(this.oa.Eb, !1);
              break;
            default:
              this.oa.qD(c, !0)
          }
        }), this.Li().listen(document, "keyup", c => {
          this.isOpen() && this.oa.qD(c, !1)
        }));
        a = new _.Mla;
        this.Li().listen(a, "visibilitychange", this.Mb.bind(this));
        this.yb = this.Fa("KwkS0");
        this.Wa = this.Fa("wteHEc")
      }

      Va() {
        // console.log('Va');
        this.Db = !0;
        const a = this.getRoot().el();
        this.Ea.init(a);
        this.Ga.init(a);
        this.Na.init(a);
        this.Pa.init(a);
        this.Qa.init(a);
        O3.NMc.oa.preload();
        P3.ENc.oa.preload();
        dWy.PPb.oa.preload();
        Z3.FNc.oa.preload();
        hWy.mMc.oa.preload();
        let b;
        ((b = this.oa.Eb.localStorage) == null ? void 0 : b.get("bbmp")) === "MUTED" && this.Ba(!1)
      }

      Ya() {
        // console.log('game init Ya');

        this.isOpen() || (_.Dv(this.Fa("NhXPfc").qb()), this.Db || this.Va(), this.Ch.open(this.Ca, _.K3b(_.Pz(_.Oz(new _.Sz, this.Jb.bind(this)), [4]), "bbfbx", () => {
          this.Ya()
        })).then(() => {
          this.Ok() && (this.Da = !0);
          this.Ur();
          this.oa.reset();
          _.nE(this);
          document.documentElement.classList.add("yVpzae");
          const a = document.activeElement;
          a instanceof HTMLElement && a.blur()
        }))
      }

      Fb() {
        this.Ch.close(this.Ca)
      }

      Jb({Dna: a}) {
        a.then(() => {
          _.oE(this);
          document.documentElement.classList.remove("yVpzae");
          this.oa.reset();
          this.notify(_.NVy)
        });
        return !0
      }

      Ur() {
        // console.log('Ur isMobile', this.isOpen(), this.oa.Eb);
        if (this.isOpen()) {
          var a = this.oa.Eb;
          if (a.isMobile) {
            var b = _.em();
            // console.log('isMobile', this.Ok(), b.width > b.height, b);
            if (this.Ok() || b.width > b.height) return;
            this.Aa.canvas.width = b.width;
            this.Aa.canvas.height = b.height - 40; // panel gap
            lXy(a);
            b = this.Sa;
            const c = b.Aa.Eb.Aa;
            b.Ea.width = c.width;
            b.Ea.height = c.height;
            b.Da.width = c.width;
            b.Da.height =
              c.height
          } else {
            b = this.Aa.canvas.getBoundingClientRect(), this.Aa.canvas.width = b.width, this.Aa.canvas.height = b.height;
            // console.log('not isMobile', b);
          }
          a.Db = a.Aa.width / a.Ga.canvas.width;
          this.wt(Date.now())
        }
      }

      wt(a) {
        const b = this.oa.Eb;
        if (this.Ok()) b.oa = a; else {
          for (; b.oa < a;) {
            const c = Math.min(5, a - b.oa);
            b.oa += c;
            this.oa.update(c)
          }
          this.Sa.render(b.oa)
        }
      }

      isOpen() {
        return this.Ch.isOpen(this.Ca)
      }

      Pb() {
        this.oa.Eb.Sj && (_.Dv(this.kb), this.oa.reset())
      }

      toggleFullscreen() {
        if (!this.oa.Eb.isMobile) {
          var a = this.Fa("MJxpWc");
          a.toggleClass("PuReq");
          var b = this.Fa("jUrdWb").qb();
          a.hasClass("PuReq") ? (this.La.show(), this.Ha.hide(), b.setAttribute("aria-label", "Enable fullscreen"), b.setAttribute("title", "Enable fullscreen")) : (this.La.hide(), this.Ha.show(), b.setAttribute("aria-label", "Disable fullscreen"), b.setAttribute("title", "Disable fullscreen"));
          this.Ur()
        }
      }

      Ba(a = !0) {
        this.isMuted = !this.isMuted;
        var b = this.Fa("XBehdc").qb();
        this.isMuted ? (this.Wa.show(), this.yb.hide(), b.setAttribute("aria-label", "Unmute audio"), b.setAttribute("title", "Unmute audio"), _.HVy(this.Ea), _.HVy(this.Ga),
          _.HVy(this.Na), _.HVy(this.Pa), _.HVy(this.Qa)) : (this.Wa.hide(), this.yb.show(), b.setAttribute("aria-label", "Mute audio"), b.setAttribute("title", "Mute audio"), _.IVy(this.Ea), _.IVy(this.Ga), _.IVy(this.Na), _.IVy(this.Pa), _.IVy(this.Qa));
        (b = this.oa.Eb.localStorage) && a && b.set("bbmp", this.isMuted ? "MUTED" : "UNMUTED")
      }

      Mb(a) {
        a.visibilityState === "hidden" && this.isOpen() && !this.isMuted && this.Ba(!1)
      }

      Ok() {
        return this.oa.Eb.isMobile && this.we.Ok()
      }
    };
    _.J(FXy.prototype, "DGXxE", function () {
      // game sound
      // console.log("DGXxE sound");
      return this.Ba
    });
    _.J(FXy.prototype, "PsoIbe", function () {
      // game fullscreen
      // console.log("PsoIbe fullscreen");
      return this.toggleFullscreen
    });
    _.J(FXy.prototype, "z6wMI", function () {
      // game restart
      // console.log("z6wMI restart");
      return this.Pb
    });
    _.J(FXy.prototype, "wijbl", function () {
      // game close
      // console.log("wijbl close");
      return this.Fb
    });
    _.J(FXy.prototype, "zaa94e", function () {
      // game init
      // console.log("zaa94e init");
      return this.Ya
    });
    _.J(FXy.prototype, "qJhGM", function () {
      // console.log("qJhGM");
      return this.Va
    });
    // console.log('game instance');
    _.P(_.Zix, FXy);
    _.u();
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.q("JXS8fb");
    _.Dkd = new _.Xe(_.Gr);
    _.u();
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.q("NdLnDf");
    _.lkd = class extends _.Wo {
    };
    _.Yo(_.kkd, _.lkd);
    _.u();
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.q("QKZgZd");
    _.Njd = function (a, b, c, d) {
      a.oa.push({Kaa: b, callbacks: d, Zvc: c})
    };
    _.Ojd = class extends _.Wo {
      constructor() {
        super();
        this.oa = []
      }
    };
    _.Yo(_.Mjd, _.Ojd);
    _.u();
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.q("zD2Asd");
    _.Ljd = class extends _.Dg {
      static Ra() {
        return {}
      }

      constructor(a) {
        super(a.Oa)
      }
    };
    _.P(void 0, _.Ljd);
    _.u();
  } catch (e) {
    _._DumpException(e)
  }
  try {
    var tHb;
    _.uHb = class extends _.m {
      constructor(a) {
        super(a)
      }

      Yc() {
        return _.Zi(this, 1, tHb)
      }

      getQuery() {
        return _.C(this, 3)
      }

      setQuery(a) {
        return _.jg(this, 3, a)
      }

      Pg() {
        return _.Pj(this, 3)
      }

      Km() {
        return _.Ni(this, 6, 0)
      }

      Oo() {
        return _.C(this, 8)
      }
    };
    tHb = [1, 7];
    _.vHb = [0, tHb, _.Lk, 1, _.E, -1, _.G, -1, _.Lk, _.E];
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.vld = function (a, b) {
      (a = _.zHa(a, new _.Co(_.Bo(), {
        path: "/fp_204",
        jz: !0
      }))) && a.Gc("client", "share").Gc("shfp", b.serialize()).Gc("authuser", String(_.uc(_.tc("QrtxK"), 0))).log()
    };
    _.Zn[525001720] = _.vHb;
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.wE = function (a, b) {
      return _.yj(a, 6, b)
    };
    _.xE = function (a) {
      return _.Gi(a, 7)
    };
    _.yE = function (a, b) {
      return _.yj(a, 8, b)
    };
    _.zE = class extends _.m {
      constructor(a) {
        super(a)
      }

      d$() {
        return _.Ni(this, 1, 1)
      }

      U1() {
        return _.Ui(this, 2, _.wg())
      }

      Zr(a) {
        return _.Vi(this, 2, a)
      }

      rH() {
        return _.C(this, 3)
      }

      p_() {
        return _.Pj(this, 3)
      }

      Lt() {
        return _.Ri(this, 5, _.wg())
      }

      Km() {
        return _.Ni(this, 6, 0)
      }

      Av() {
        return _.Ni(this, 8, 0)
      }
    };
    _.zE.prototype.wb = "c5air";
    _.akd = [0, _.G, _.Zk, _.E, _.G, _.Ik, _.G, _.wk, _.G, _.wk];
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.GE = class extends _.m {
      constructor(a) {
        super(a)
      }

      Ca() {
        return _.C(this, 1)
      }

      iAb() {
        return _.kg(this, 1)
      }

      Aa(a) {
        return _.jg(this, 1, a)
      }

      Da() {
        return _.C(this, 2)
      }

      iOc(a) {
        _.jg(this, 2, a)
      }

      getImageUrl() {
        return _.C(this, 3)
      }

      Ga(a) {
        _.jg(this, 3, a)
      }

      Ba() {
        return _.cj(this, 3)
      }

      getTitle() {
        return _.C(this, 4)
      }

      setTitle(a) {
        return _.jg(this, 4, a)
      }

      wd() {
        return _.Pj(this, 4)
      }

      t4() {
        return _.C(this, 5)
      }

      Ha() {
        return _.C(this, 6)
      }

      La() {
        return _.Pj(this, 6)
      }

      K4() {
        return _.p(this, _.zE, 7)
      }

      Itb() {
        return _.C(this, 8)
      }
    };
    _.GE.prototype.wb = "MCsHVd";
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.AE = class extends _.m {
      constructor(a) {
        super(a)
      }

      K4() {
        return _.p(this, _.zE, 13)
      }

      Aa() {
        return _.B(this, 14)
      }
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.sld = function (a, b) {
      return _.yj(a, 1, b)
    };
    _.tld = function (a, b) {
      return _.Ej(a, 2, b)
    };
    _.HE = function (a, b) {
      return _.jg(a, 3, b)
    };
    _.uld = function () {
      var a = new _.AE;
      return _.yh(a, 5, !0)
    };
    _.IE = function (a) {
      var b = _.uld();
      return _.jg(b, 12, a)
    };
    _.JE = function (a, b) {
      return _.yh(a, 14, b)
    };
    _.KE = function (a, b) {
      return _.yj(a, 9, b)
    };
    _.LE = function (a, b) {
      return _.jg(a, 5, b)
    };
    _.ME = function (a, b) {
      return _.Xb(a, _.uHb, 10, b)
    };
    _.NE = function (a, b) {
      return _.Xb(a, _.GE, 1, b)
    };
    _.OE = function (a, b) {
      return _.Xb(a, _.AE, 2, b)
    };
    _.PE = function (a, b) {
      return _.yj(a, 3, b)
    };
    _.QE = class extends _.m {
      constructor(a) {
        super(a, 4)
      }

      cE() {
        return _.p(this, _.GE, 1)
      }

      Km() {
        return _.Ni(this, 3, 0)
      }
    };
    _.QE.prototype.wb = "B34zmc";
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.eld = class extends _.m {
      constructor(a) {
        super(a)
      }
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.fld = function (a = null) {
      var b = new _.eld;
      a = _.qc(a);
      return _.jg(b, 1, a)
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    var jld, ild, hld;
    _.kld = function (a = {}) {
      const b = _.gld();
      var c = _.fld(a.targetElement);
      _.Xb(b, _.eld, 9, c);
      if (a.k_) {
        c = a.k_;
        var d = _.Wd(a.targetElement);
        if (!d) throw Error("Fi");
        const e = new _.xe;
        _.ama(e, c, d);
        d = _.ye(e);
        c = new hld;
        c = _.jg(c, 1, d);
        _.Xb(b, hld, 12, c)
      }
      a.triggerElement && ((d = _.ria(a.triggerElement)) ? (c = new ild, c = _.jg(c, 1, d)) : c = null, c && _.Xb(b, ild, 10, c), (c = _.Wd(a.triggerElement)) ? (a = new jld, a = _.jg(a, 1, c)) : a = null, a && _.Xb(b, jld, 11, a));
      return b
    };
    jld = class extends _.m {
      constructor(a) {
        super(a)
      }
    };
    ild = class extends _.m {
      constructor(a) {
        super(a)
      }
    };
    hld = class extends _.m {
      constructor(a) {
        super(a)
      }
    };
    _.gld = function () {
      return new _.Gt
    };
    var lld = _.Sha(_.Gt), mld;
    _.gld = function () {
      return (mld || (mld = lld('[null,[[48,"1"]]]'))).c9()
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.Rkd = function (a, b) {
      return _.Zb(a, 1, b)
    };
    var Skd;
    _.Tkd = function (a) {
      var b = new Skd;
      return _.Xb(b, _.Zs, 1, a)
    };
    _.Ukd = function (a, b) {
      return _.yj(a, 2, b)
    };
    Skd = class extends _.m {
      constructor(a) {
        super(a)
      }
    };
    var Vkd;
    _.Wkd = function (a) {
      var b = new Vkd;
      return _.Xb(b, Skd, 1, a)
    };
    Vkd = class extends _.m {
      constructor(a) {
        super(a)
      }

      getContext() {
        return _.p(this, _.Gt, 2)
      }

      setContext(a) {
        return _.Xb(this, _.Gt, 2, a)
      }
    };
    _.Xkd = class extends _.m {
      constructor(a) {
        super(a)
      }
    };
    var Ykd = class extends _.m {
      constructor(a) {
        super(a)
      }
    };
    Ykd.prototype.wb = "xt0Ntc";
    new _.sh(Ykd);
    _.Zkd = new _.Yg("uYKSof", Ykd, Vkd, [_.Zq, !0, _.$q, "/SearchApiService.GetShortenedKpSharingUrl"]);
  } catch (e) {
    _._DumpException(e)
  }
  try {
    var pld, nld;
    _.old = function (a, b = 1) {
      return _.A(function* () {
        var c = _.Rkd(new _.Zs, a);
        c = _.Ukd(_.Tkd(c), b);
        c = _.Wkd(c).setContext(_.kld());
        c = yield(yield nld()).fetch(_.Zkd.getInstance(c));
        var d, e;
        const f = c == null ? void 0 : (d = _.p(c, _.Xkd, 1)) == null ? void 0 : (e = _.p(d, _.Zs, 1)) == null ? void 0 : e.hh();
        if (!f) throw d = Error("Gi"), e = {res: c.serialize()}, _.le(d, {tf: e}), d.details = e, d;
        return f
      })
    };
    nld = function () {
      return _.A(function* () {
        if (!pld) {
          const a = _.lc().oa;
          pld = yield _.$e(_.vp, a)
        }
        return pld
      })
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.$kd = class extends _.m {
      constructor(a) {
        super(a)
      }
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.ald = function (a, b) {
      return b.filter(c => _.Ui(c, 2, _.wg()).includes(a) || _.Ui(c, 2, _.wg()).includes(62)).map(c => _.C(c, 1)).sort()
    };
    _.bld = function (a, b) {
      return _.ald(a, b.map(c => {
        var d = new _.$kd;
        var e = c.Aa();
        d = _.jg(d, 1, e);
        c = c.Ba();
        return _.sza(d, 2, c)
      }))
    };
    _.cld = function (a, b, c, d, e) {
      if (!a || !a.Ks().match("^(?:.*\\.)?google(rs)?.(?:com|co.[a-z\\-]{2,})$")) return a;
      let f;
      b = (f = (new Map([[0, new FE([null, null, null, "uk"])], [1, new FE([null, null, null, "ob/air_quality"])], [2, new FE([null, null, null, "crisisresponse/sos"])], [3, new FE([null, null, null, "lr/vocabulary/1"])], [4, new FE([null, null, null, "lr/vocabulary/2"])], [5, new FE([null, null, null, "lr/vocabulary/3"])], [6, new FE([null, null, null, "lr/vocabulary/4"])], [7, new FE([null, null, null, "lr/artgame"])], [8, new FE([null,
        null, null, "kp/ephemeral"])], [9, new FE([null, null, null, "kp/health_search/checklists"])], [10, new FE([null, null, null, "kp/health_search"])], [11, new FE([null, null, null, "kp/health_search/symptom_search"])], [12, new FE([null, null, null, "im/textlists/detail"])], [13, new FE([null, null, null, "kp"])], [14, new FE([null, null, null, "kp/local"])], [15, new FE([null, null, null, "kp/osrp"])], [16, new FE([null, null, null, "kp/osrp/sports_match"])], [17, new FE([null, null, null, "osrp/cluster"])], [18, new FE([null, null, null, "pp/rl"])],
        [19, new FE([null, null, null, "shopping"])], [20, new FE([null, null, null, "vtmt"])], [21, new FE([null, null, null, "kp/ee"])], [22, new FE([null, null, null, "sgc"])], [23, new FE([null, null, null, "lr/sports_match"])], [24, new FE([null, null, null, "fbx"])], [25, new FE([null, null, null, "kp/3d"])], [26, new FE([null, null, null, "wa"])], [27, new FE([null, null, null, "ka", null, null, 2])], [28, new FE([null, null, null, "sports/mmo"])], [29, new FE([null, null, null, "gs"])], [30, new FE([null, null, null, "srp/img"])], [31, new FE([null, null, null,
          "screenshot/srp"])], [32, new FE([null, null, null, "flight_status"])], [33, new FE([null, null, null, "osrp/weather", null, null, 2])], [34, new FE([null, null, null, "train_status"])], [35, new FE([null, null, null, "srp/wr"])], [36, new FE([null, null, null, "srp/rcp"])], [37, new FE([null, null, null, "srp/vid"])], [38, new FE([null, null, null, "wtr"])], [39, new FE([null, null, null, "kp/local_categorical"])], [40, new FE([null, null, null, "ccy/ob"])], [41, new FE([null, null, null, "srp/ad"])], [42, new FE([null, null, null, "test_source_suffix",
          null, ["test_bshm_mark1", "test_bshm_mark2", "test_bshm_mark3"]])], [62, new FE([null, null, null, "horizontal_source_suffix"])], [43, new FE([null, null, null, "im"])], [44, new FE([null, null, null, "im/amp"])], [45, new FE([null, null, null, "loc/act"])], [83, new FE([null, null, null, "loc/uni"])], [46, new FE([null, null, null, "loc/hdr"])], [47, new FE([null, null, null, "loc/tile"])], [48, new FE([null, null, null, "dc"])], [49, new FE([null, null, null, "localposts"])], [70, new FE([null, null, null, "loc/osrp"])], [50, new FE([null, null, null,
          "do"])], [51, new FE([null, null, null, "hs"])], [52, new FE([null, null, null, "interactive_visuals"])], [53, new FE([null, null, null, "im/lite"])], [54, new FE([null, null, null, "lr/vocabulary"])], [55, new FE([null, null, null, "loc/geo"])], [56, new FE([null, null, null, "ucp"])], [57, new FE([null, null, null, "gnai"])], [58, new FE([null, null, null, "job/uv"])], [59, new FE([null, null, null, "shop/drm"])], [60, new FE([null, null, null, "prdct/uv"])], [61, new FE([null, null, null, "loc/uv"])], [63, new FE([null, null, null, "rcp/uv"])], [94, new FE([null,
          null, null, "rcp/card"])], [64, new FE([null, null, null, "loc/srv"])], [65, new FE([null, null, null, "dq/header"])], [66, new FE([null, null, null, "dq/end"])], [67, new FE([null, null, null, "pq/start"])], [68, new FE([null, null, null, "pq/end"])], [69, new FE([null, null, null, "fps/uv"])], [71, new FE([null, null, null, "loc/recall"])], [72, new FE([null, null, null, "pq/header"])], [73, new FE([null, null, null, "saves/uv"])], [74, new FE([null, null, null, "job/li"])], [75, new FE([null, null, null, "loc/mrchnt"])], [76, new FE([null, null, null, "dlt/scv"])],
        [77, new FE([null, null, null, "dlt/nslu"])], [78, new FE([null, null, null, "discover"])], [79, new FE([null, null, null, "googlies"])], [80, new FE([null, null, null, "loc/legacy"])], [81, new FE([null, null, null, "loc/lpt"])], [82, new FE([null, null, null, "ob/pin"])], [84, new FE([null, null, null, "prdct/hdr"])], [85, new FE([null, null, null, "prdct/act"])], [86, new FE([null, null, null, "ob/solar"])], [87, new FE([null, null, null, "dlt/luda"])], [88, new FE([null, null, null, "loc/expv"])], [89, new FE([null, null, null, "shopping/holiday100"])],
        [90, new FE([null, null, null, "cref"])], [91, new FE([null, null, null, "kumh"])], [92, new FE([null, null, null, "pcee"])], [93, new FE([null, null, null, "vid"])], [95, new FE([null, null, null, "dpv"])]])).get(b)) == null ? void 0 : _.C(f, 4);
      _.uo(_.uo(a, "source", `sh/x/${b}/m${c}/${d}`), "kgs", _.lnc(16, 16).toLowerCase());
      e.length > 0 && _.uo(a, "shem", Array.from(new Set(e)).sort().join(","));
      return a
    };
    _.dld = {
      Yaf: 0,
      zze: 1,
      hIe: 2,
      rXe: 3,
      sXe: 4,
      tXe: 5,
      uXe: 6,
      oXe: 7,
      JNe: 8,
      HTe: 9,
      ITe: 10,
      JTe: 11,
      WTe: 12,
      wXe: 13,
      GOc: 14,
      n5e: 15,
      p5e: 16,
      o5e: 17,
      j7e: 18,
      Fbf: 19,
      Hnf: 20,
      pXe: 21,
      Vaf: 22,
      wdf: 23,
      Ywd: 24,
      cjf: 25,
      qof: 26,
      nXe: 27,
      xdf: 28,
      mRe: 29,
      Cdf: 30,
      w$e: 31,
      dQe: 32,
      lof: 33,
      Mjf: 34,
      yof: 35,
      Gdf: 36,
      Idf: 37,
      Wof: 38,
      VYe: 39,
      qIe: 40,
      Uif: 41,
      Xaf: 42,
      Waf: 62,
      LNc: 43,
      UUe: 44,
      SYe: 45,
      tZe: 83,
      iZe: 46,
      sZe: 47,
      Nvd: 48,
      lZe: 49,
      cZe: 70,
      uLe: 50,
      OTe: 51,
      GVe: 52,
      XUe: 53,
      qXe: 54,
      WYe: 55,
      Pkf: 56,
      p_e: 57,
      OWe: 58,
      Ebf: 59,
      Rlf: 60,
      BZe: 61,
      e9e: 63,
      c9e: 94,
      HOc: 64,
      lMe: 65,
      kMe: 66,
      oMe: 67,
      mMe: 68,
      gQe: 69,
      rZe: 71,
      nMe: 72,
      u$e: 73,
      PWe: 74,
      aZe: 75,
      aKe: 76,
      ZJe: 77,
      cLe: 78,
      XSe: 79,
      ZYe: 80,
      jZe: 81,
      e6e: 82,
      F7e: 84,
      D7e: 85,
      VTe: 86,
      YJe: 87,
      hOe: 88,
      Hbf: 89,
      bIe: 90,
      xXe: 91,
      d7e: 92,
      bmf: 93,
      iLe: 95
    };
    var FE = class extends _.m {
      constructor(a) {
        super(a)
      }
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.BE = class extends _.m {
      constructor(a) {
        super(a)
      }
    };
    _.Mkd = [1, 2];
  } catch (e) {
    _._DumpException(e)
  }
  try {
    var Nkd, Okd;
    Nkd = class extends _.m {
      constructor(a) {
        super(a)
      }

      uH() {
        return _.Gi(this, 1)
      }
    };
    _.CE = function (a) {
      var b = new Nkd;
      return _.Ah(b, 1, a)
    };
    Okd = class extends _.m {
      constructor(a) {
        super(a)
      }

      uH() {
        return _.Gi(this, 1)
      }
    };
    _.Pkd = function (a) {
      var b = new Okd;
      return _.Ah(b, 1, a)
    };
    _.DE = function (a, b) {
      return _.si(a, 1, _.Mkd, b)
    };
    _.Qkd = function (a, b) {
      return _.si(a, 2, _.Mkd, b)
    };
    _.EE = _.H("ZUAQIc");
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.Lkd = function (a) {
      let b = !1, c = !1;
      a.then(() => b = !0, () => c = !0);
      return new Promise((d, e) => {
        const f = [];
        for (let g = 50; g < 950; g += 50) f.push(setTimeout(() => {
          f.shift();
          b ? d() : (c || f.length === 0) && e(c ? 1 : 2);
          if (b || c || f.length === 0) for (const h of f) clearTimeout(h)
        }, g))
      })
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.Qjd = _.H("yoKyEf");
    _.Rjd = _.H("gtOXRb");
    _.Sjd = _.H("nVW9lb");
    _.Tjd = _.H("tfcxtb");
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.q("Wct42");
    var wld, xld, yld, zld, Ald, Bld, Cld, Dld, Eld, Gld, Lld, Mld, Fld, Ild, Nld, Jld, Kld, Pld, Qld, Rld, Hld, Old;
    wld = function (a, b, c) {
      if (c !== 0) {
        for (const d of a.oa) if (d.Kaa === c) {
          d.callbacks.push(b);
          d.Zvc && b(d.Zvc);
          return
        }
        _.Njd(a, c, null, [b])
      }
    };
    xld = [6, 10];
    yld = [0, _.E, -5, _.akd, _.E, _.G, _.vHb];
    zld = _.Kha(yld);
    Ald = _.ac(yld);
    Bld = Error("Hi");
    Cld = function (a, b) {
      a = a.Xa(b);
      return a.size() === 1 ? _.hp(a) : null
    };
    Dld = function (a) {
      a.Kaa !== 0 && wld(a.Fab, b => {
        a.oa(b)
      }, a.Kaa)
    };
    Eld = function (a) {
      if (!a.getData("ved").Hb()) {
        var b = _.ll(a.getData("csrsve"), "");
        b && a.setData("ved", "1t:" + b)
      }
    };
    Gld = function (a) {
      return _.A(function* () {
        a.Ca.ZDa() && a.Ba === null && (a.Ba = yield a.Ca.MZa(b => {
          b && b.Aa() && Fld(a, b.getState())
        }))
      })
    };
    Lld = function (a, b) {
      return _.A(function* () {
        const c = a.Mm.iAb();
        if (!c) throw Error("Ii");
        if (!a.Pa) {
          var d = a.getRoot().getData("ld").number(0) === 1 ? a.Fa("Sx9Kwc").el() : _.Yl("shdg");
          a.Pa = a.getController(d)
        }
        d = yield a.Pa;
        Hld(a) || !_.B(a.c1, 5) || _.Pj(a.Mm, 2) ? yield d.show(b.clone(), a.Mb, a.c1.clone()) : yield d.La(b.clone(), a.Mb, Ild(c, _.Ni(a.Mm, 9, 1)), a.c1.clone());
        Jld(a);
        Kld(a, {xwa: !1})
      })
    };
    Mld = function (a) {
      if (a.Da) var b = {
        E6c: a.Ub,
        psc: a.Ga != null,
        ILa: a.La != null,
        F6c: a.Ha !== null
      }; else if (Hld(a)) b = {h1d: !0, psc: !0, ILa: !0}; else {
        b = !!_.Wi(a.c1, 10, xld);
        var c = a.c1.Aa();
        b = {E6c: b || !c, psc: !b, ILa: !0, F6c: !b && a.Ca.ola()}
      }
      const {h1d: d = !1, psc: e = !0, E6c: f = !1, ILa: g = !0, F6c: h = !1} = b;
      b = a.getTitle();
      c = a.Mm.getImageUrl();
      var k = a.Mm.Da();
      k = k ? k : a.Mm.iAb();
      const l = a.Pw(b, a.Mm.Itb(), k, !f);
      var n;
      if (n = h) if (a.Da && a.Ha) n = a.Ha; else if (_.Pj(a.c1, 12) && _.C(a.c1, 12)) {
        n = _.C(a.c1, 12);
        var r;
        if (r = a.kb && a.Fc) r = _.wo(n), r = !(r.Ks().toString() &&
          r.Aa === "https");
        r && (n = a.Sa)
      } else n = a.Sa;
      return {
        title: g && b || void 0,
        imageUrl: d && c || void 0,
        V_: e && l || void 0,
        pageUrl: f && k || void 0,
        w3: n || void 0
      }
    };
    Fld = function (a, b) {
      switch (b) {
        case 1:
          Nld(a, !0);
          break;
        case 0:
          Jld(a);
          Kld(a, {xwa: !0});
          break;
        case 2:
          Nld(a, !1);
          break;
        case 3:
          ({xwa: b} = {xwa: !0}), Old(a, b, a.Yb, a.qc)
      }
    };
    Ild = function (a, b) {
      return _.A(function* () {
        const c = yield _.old(a, b);
        if (!c) throw Error("Ki");
        return {Jra: c}
      })
    };
    Nld = function (a, b) {
      Jld(a);
      a.Ba !== null || Kld(a, {xwa: !0});
      b ? Pld(a, {xwa: !0}) : (Qld(a, {xwa: !0}), b = _.DE(new _.BE, _.CE(155748)), _.$f(document, _.EE, {Jn: b}));
      Rld(a);
      a.Ba && (a.Ba(), a.Ba = null)
    };
    Jld = function (a) {
      !a.Qa && a.Aa && (Eld(a.Aa), _.Cv([new _.Go(a.Aa.el(), "show")]))
    };
    Kld = function (a, {xwa: b}) {
      Old(a, b, a.Va, a.Pb)
    };
    Pld = function (a, {xwa: b}) {
      a.Ea || (Old(a, b, a.Fb, a.Jb), a.Ea = !0)
    };
    Qld = function (a, {xwa: b}) {
      a.Ea || Old(a, b, a.Wa, a.Ya)
    };
    Rld = function (a) {
      a.Qa || (a.Ea = !1, a.Aa && (Eld(a.Aa), _.Cv([new _.Go(a.Aa.el(), "hide")])))
    };
    Hld = function (a) {
      let b;
      return !!_.Wi(a.c1, 6, xld) && !((b = a.Mm) == null || !_.Pj(b, 3))
    };
    Old = function (a, b, c, d) {
      if (c = b ? c : d) Eld(c), c.getData("ved").Hb() && (b = {shdeb: b ? "n" : "w"}, a.uc ? c.el() : _.Dv(c.el(), {data: b}))
    };
    _.Sld = class extends _.Dg {
      static Ra() {
        return {
          jsdata: {Ame: _.QE},
          service: {share: _.Dkd, Fab: _.Ojd, fld: _.lkd},
          ud: {Hme: {jsname: "A2d8zd", ctor: _.Ljd}}
        }
      }

      constructor(a) {
        super(a.Oa);
        this.Na = this.Aa = this.qc = this.Ya = this.Pb = this.Jb = this.Yb = this.Wa = this.Va = this.Fb = null;
        this.yc = !1;
        this.logger = null;
        this.Fc = this.kb = this.yb = this.Ub = this.Da = this.Ea = !1;
        this.Sa = "";
        this.La = this.Ga = this.Ha = null;
        this.Qa = this.uc = !1;
        this.Ba = this.Pa = null;
        this.Db = 0;
        this.Ca = a.service.share;
        this.Fab = a.service.Fab;
        this.fld = a.service.fld;
        const b =
          a.jsdata.Ame;
        this.Kaa = b.Km();
        let c;
        this.c1 = (c = _.p(b, _.AE, 2)) != null ? c : new _.AE;
        this.Mm = b == null ? void 0 : b.cE();
        this.Mb = (this.yb = this.getData("exp").Hb()) ? null : {
          qBb: this.Fa("PHQQPc").el(),
          XVc: _.ll(this.Fa("k3Pg4").getData("ved"), ""),
          Ykd: _.ll(this.Fa("IyZ18e").getData("ved"), ""),
          ald: _.ll(this.Ab("NlZIeb").getData("ved"), ""),
          gld: _.ll(this.Ab("Qoiwbb").getData("ved"), ""),
          hld: _.ll(this.Ab("Cr3q7c").getData("ved"), "")
        };
        this.Fb = Cld(this, "vOr6ad");
        this.Jb = Cld(this, "xc0WGd");
        this.Va = Cld(this, "LVWe7b");
        this.Pb = Cld(this, "YvFDOe");
        this.Wa = Cld(this, "WZfLqc");
        this.Ya = Cld(this, "TNQ5if");
        this.Yb = Cld(this, "Igko6d");
        this.qc = Cld(this, "XfdVte");
        this.Aa = Cld(this, "qMPrxc");
        this.kb = this.getData("isaga").Hb();
        this.Fc = this.getData("tv").Hb();
        this.Sa = _.jl(this.getData("dt")) || "";
        this.uc = this.getData("ssrl").Hb();
        this.Qa = this.getData("lcviv").Hb();
        this.yc = this.getData("pdoc").Hb();
        this.Da = this.getData("ssdm").Hb();
        this.Ub = this.getData("sspu").Hb();
        this.Ha = _.jl(this.getData("ssth"));
        this.Ga = _.jl(this.getData("sspt"));
        this.La =
          _.jl(this.getData("sst"));
        this.Na = a.ud.Hme || null;
        Dld(this)
      }

      oa(a) {
        this.Mm = this.Mm ? zld(this.Mm, new _.Jha(Ald(a))) : a;
        _.Pj(a, 1) && !_.Pj(a, 2) && _.bh(this.Mm, 2)
      }

      cE() {
        let a;
        return ((a = this.Mm) == null ? void 0 : a.clone()) || null
      }

      Dc(a) {
        a = _.cg(a);
        a.Mm && this.oa(a.Mm)
      }

      onClick(a) {
        const b = this;
        return _.A(function* () {
          if (b.yc) {
            var c;
            a == null || (c = a.event) == null || c.stopPropagation();
            let k;
            a == null || (k = a.event) == null || k.preventDefault()
          }
          c = b.getRoot().el();
          _.Xf(c, _.Rjd);
          Eld(b.getRoot());
          c = b.getRoot().el();
          var d, e;
          (d = b.Mm) != null &&
          _.ai(d, _.uHb, 10) && !_.Xj((e = b.Mm) == null ? void 0 : _.p(e, _.uHb, 10), new _.uHb) && _.vld(c, _.p(b.Mm, _.uHb, 10));
          b.getRoot().getData("ved").Hb() && _.Dv(b.getRoot().el());
          _.$f(window.document.body, _.HFb);
          _.mv(b.getRoot().el(), "hide_popup");
          if (!b.Mm) throw Error("Ii");
          let f;
          if ((f = b.Mm) == null || !_.Pj(f, 2)) {
            var g;
            d = _.wo((g = b.Mm) == null ? void 0 : g.Ca());
            //_.uo(d, "kgs", _.lnc(16, 16).toLowerCase()); // share link
            var h;
            (h = b.Mm) == null || h.Aa(d.toString())
          }
          if (b.Na) g = b.cE(), b.Na && g && (g = b.getTitle(), d = b.Mm, h = d.getImageUrl(), d = d.Da(), e = _.cj(b.Mm,
            1) || null, d = d ? d : e, e = b.Mm.Itb() || g, b.Na.Dm({
            url: d,
            text: e,
            title: g,
            subtitle: "See more information about this place on Google",
            imageUrl: h
          }, b, b.getRoot().el())); else {
            if (b.d0b()) {
              yield Gld(b);
              try {
                return yield b.N6b()
              } catch (k) {
                if (k === Bld) return
              }
            }
            yield Lld(b, b.Mm)
          }
        })
      }

      d0b() {
        return this.Ca.isAvailable()
      }

      N6b() {
        const a = this;
        return _.A(function* () {
          if (Date.now() - a.Db < 2E3) return Promise.reject(Bld);
          a.Db = Date.now();
          const b = () => _.A(function* () {
            return a.Ca.S8(Mld(a)).then(e => {
              Fld(a, e)
            })
          });
          if (Hld(a) || !_.B(a.c1, 5) || _.Pj(a.Mm,
            2)) return b();
          let c;
          const d = Ild((c = a.Mm) == null ? void 0 : c.Ca(), _.Ni(a.Mm, 9, 1)).then(e => {
            e.Jra && a.Mm.iOc(e.Jra)
          });
          try {
            return yield _.Lkd(d), b()
          } catch (e) {
            if (e === 2) return b();
            throw Error("Ji");
          }
        })
      }

      getTitle() {
        return this.Da && this.La ? this.La : this.Mm.getTitle()
      }

      Pw(a, b, c, d = !0) {
        const e = b || a;
        return this.Da && this.Ga ? this.Ga : d && c ? e ? this.c1.Aa() ? a && b ? a + "\n" + c + "\n\n" + b : "\u200e" + c + "\n\n" + e : e + " " + c : c : e
      }

      Vc() {
        Pld(this, {xwa: !1})
      }

      Jc() {
        Qld(this, {xwa: !1});
        Rld(this)
      }
    };
    _.J(_.Sld.prototype, "ImCKxc", function () {
      return this.Jc
    });
    _.J(_.Sld.prototype, "HR5wBe", function () {
      return this.Vc
    });
    _.J(_.Sld.prototype, "RHBhJe", function () {
      return this.N6b
    });
    _.J(_.Sld.prototype, "RrBfkf", function () {
      return this.d0b
    });
    _.J(_.Sld.prototype, "KjsqPd", function () {
      return this.onClick
    });
    _.J(_.Sld.prototype, "CLN7sd", function () {
      return this.Dc
    });
    _.J(_.Sld.prototype, "akLNbe", function () {
      return this.cE
    });
    _.P(_.rld, _.Sld);
    _.u();
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.Eyx = _.w("tQSjk", []);
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.q("tQSjk");
    _.P(_.Eyx, class extends _.Dg {
      constructor(a) {
        super(a.Oa);
        this.oa = this.Fa("ZC7Tjb");
        this.Xa("mNTMHb").remove();
        this.oa.removeClass("ARvdN");
        this.oa.el().setAttribute("data-loaded", "true")
      }
    });
    _.u();
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.gjx = _.w("MC0Gmc", []);
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.AOb = _.H("iJE3Ge");
    _.BOb = _.H("DmzWq");
    _.COb = _.H("BDs6B");
    _.ex = _.H("ep03Ne");
    _.DOb = _.H("gvA4Rc");
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.q("MC0Gmc");
    var Dfz = function (a) {
      a.Ab("xl0Jqb").each(b => {
        const c = b.children;
        for (var d = c.length; d > 0; d--) b.appendChild(c[Math.floor(Math.random() * d)]);
        for (d = 0; d < c.length; d++) c[d].hasAttribute("data-pinned") && b.prepend(c[d])
      })
    }, Efz = class extends _.Dg {
      static Ra() {
        return {controller: {W$d: {jsname: "hyR3tb", ctor: _.Bg}}}
      }

      constructor(a) {
        super(a.Oa);
        this.Aa = this.oa = !1;
        this.Ha = this.getData("parentFunbox").string();
        this.expando = this.Fa("JTivif").el();
        this.contents = this.Fa("jrbfOd").el();
        Dfz(this);
        a.controller.W$d.kma()
      }

      Ea() {
        return this.expando
      }

      Ba() {
        return this.contents
      }

      Ga() {
        this.Aa ||
        ((0, _.Lo)(() => {
          this.notify(_.ex)
        }, 500), this.oa = this.Aa = !0)
      }

      Da() {
        _.Cv([new _.Go(this.contents, "show")], {
          triggerElement: this.expando,
          interactionContext: this.oa ? 2 : 0,
          data: {fun: `parent-funbox=${this.Ha},auto=${this.oa}`}
        });
        this.Aa = !0;
        this.oa = !1
      }

      Ca() {
        _.Cv([new _.Go(this.contents, "hide")], {triggerElement: this.expando, interactionContext: 1})
      }
    };
    _.J(Efz.prototype, "QqKrT", function () {
      return this.Ca
    });
    _.J(Efz.prototype, "tQwMlb", function () {
      return this.Da
    });
    _.J(Efz.prototype, "JhW48", function () {
      return this.Ga
    });
    _.J(Efz.prototype, "e3lCZb", function () {
      return this.Ba
    });
    _.J(Efz.prototype, "gpJ3fc", function () {
      return this.Ea
    });
    _.P(_.gjx, Efz);
    _.u();
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.gEe = _.w("QE1bwd", []);
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.DFb = function (a) {
      if (!arguments.length) return [];
      const b = [];
      let c = arguments[0].length;
      for (var d = 1; d < arguments.length; d++) arguments[d].length < c && (c = arguments[d].length);
      for (d = 0; d < c; d++) {
        const e = [];
        for (let f = 0; f < arguments.length; f++) e.push(arguments[f][d]);
        b.push(e)
      }
      return b
    };
    _.Ov = _.H("BUYwVb");
    _.EFb = _.H("LsLGHf");
  } catch (e) {
    _._DumpException(e)
  }
  try {
    var VDe;
    VDe = function (a, b) {
      for (let d = 0; d < a.length; ++d) {
        var c = _.Rd(a[d], b);
        if (c) {
          c = c.match(/\S+/g) || [];
          for (let e = 0; e < c.length; e++) c[e] === "img.l" && _.$f(a[d], _.Ov)
        }
      }
    };
    _.XDe = function (a) {
      a = _.WDe(["xpdxpnd", "mod"], a);
      VDe(a, "cact")
    };
    _.YDe = function (a) {
      a = _.WDe(["xpdxpnd", "mod"], a);
      VDe(a, "eact")
    };
    _.ZDe = function (a, b, c, d, e) {
      function f(h, k) {
        for (const l of h) _.Sd(l, "nlvc") || _.Wd(l) && g.push(new _.Go(l, k))
      }

      if (!_.Sd(b, "nlvc")) {
        var g = [];
        c === "expanding" ? (f(d, "show"), f(e, "hide"), b = 1) : (f(d, "hide"), f(e, "show"), b = 2);
        _.Cv(g, {triggerElement: a || void 0, interactionContext: b, data: {ct: "knowledge_expander_toggle", cad: c}})
      }
    };
    _.$De = function (a) {
      return _.xl(a, "xpdopen")
    };
    _.bK = function (a) {
      return _.Dm(a, "xpdbox")
    };
    _.WDe = function (a, b) {
      const c = [];
      a = b.querySelectorAll("." + a.join(", ."));
      for (let d = 0; d < a.length; ++d) _.bK(a[d]) === b && c.push(a[d]);
      return c
    };
    _.aEe = function (a) {
      a = _.WDe(["vk_arc"], a);
      return a.length > 0 ? a[0] : null
    };
    _.bEe = function (a, b) {
      _.bn(a, b);
      (a = _.bK(a)) && (b ? _.Td(a, "nlvc") : _.Qd(a, "nlvc", "1"))
    };
    _.cEe = function (a, b) {
      var c = _.aEe(a);
      if (c !== null || a.querySelector("[data-inside-content-expander-position]")) c !== null && (_.ln(c, "expanded", b ? "true" : "false"), c.hasAttribute("aria-label") && _.on(c, b ? "Show less" : "Show more")), c = `.${b ? "xpdclps" : "xpdxpnd"}`, _.$a(a.querySelectorAll(`.${b ? "xpdxpnd" : "xpdclps"}`), d => {
        _.mn(d, "hidden")
      }), _.$a(a.querySelectorAll(c), d => {
        _.ln(d, "hidden", !0)
      })
    };
    _.dEe = function (a, b) {
      return (b = b ? b.srcElement || b.target : null) && b !== a && _.Cm(b, "LI", "bili") ? !1 : !0
    };
    _.eEe = function (a) {
      let b = a.event;
      a = a.rb.el();
      const c = _.dg(b);
      c && (b = c);
      return _.dEe(a, b)
    };
    _.fEe = function (a, b) {
      if (b) {
        var c = _.WDe(["vk_ard"], a);
        c = c.length > 0 ? c[0] : null
      } else c = _.WDe(["vk_aru"], a), c = c.length > 0 ? c[0] : null;
      c && _.Dl(c, b ? "vk_ard" : "vk_aru", b ? "vk_aru" : "vk_ard");
      _.cEe(a, b)
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    var pOb;
    _.nOb = function (a) {
      _.cx.publish("iehc", a)
    };
    _.oOb = function (a) {
      _.cx.publish("r", a)
    };
    pOb = function (a, b, c) {
      return _.cx.subscribe(a, c !== null ? d => {
        d && d === _.Dm(c, "xpdbox") && b(d)
      } : b)
    };
    _.qOb = function (a, b) {
      return pOb("hc", a, b || null)
    };
    _.rOb = function (a, b) {
      return pOb("es", a, b || null)
    };
    _.sOb = function (a, b) {
      return pOb("ef", a, b || null)
    };
    _.tOb = function (a, b) {
      return pOb("cs", a, b || null)
    };
    _.uOb = function (a, b) {
      return pOb("cf", a, b || null)
    };
    _.dx = function (a) {
      return _.cx.unsubscribeByKey(a)
    };
    _.cx = new _.Ev;
    _.vOb = function (a) {
      _.cx.publish("es", a)
    };
    _.wOb = function (a) {
      _.cx.publish("ef", a)
    };
    _.xOb = function (a) {
      _.cx.publish("cs", a)
    };
    _.yOb = function (a) {
      _.cx.publish("cf", a)
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.q("QE1bwd");
    var zEe, FEe, DEe, GEe;
    zEe = function (a, b = 1, c = 0) {
      return _.yEe(a, b, c)
    };
    _.BEe = function (a, b, c) {
      if (_.Pf(a.Aa, b)) {
        var d = _.Cm(b, "g-expandable-content");
        if (d && !a.container.emb(d) && AEe(d) !== 0) {
          const e = a.container.Cd();
          if (e && a.container.kuc(d) || !e && a.container.Htc(d)) a = d.scrollHeight, a = c ? a + c : a + b.scrollHeight, _.Gm(d, "max-height", `${a}px`)
        }
      }
    };
    FEe = function (a, b) {
      (new _.$gd(() => {
        b || _.CEe(a);
        a.container.HQ(b);
        DEe(a, b);
        _.BEe(a, a.Aa, _.EEe(a))
      })).start();
      a.Da = Date.now()
    };
    _.EEe = function (a) {
      let b = 0;
      _.$a(a.container.Vmc(), c => {
        a.container.kuc(c) ? b += c.scrollHeight : a.container.Htc(c) && (b -= c.scrollHeight)
      }, a);
      return b
    };
    _.CEe = function (a) {
      var b = a.container.Nzb();
      b = b ? b.getBoundingClientRect().top - 8 : a.Aa.getBoundingClientRect().bottom - 8;
      a.container.Ppa() && (b -= _.EEe(a));
      b < 0 && (0, _.Jv.by)(0, b)
    };
    DEe = function (a, b) {
      const c = a.container.Vnc();
      c.find((d, e) => {
        if (a.container.emb(d) || b && a.Ea > 1 && a.Ba > e && e < c.length - 1) return !1;
        d = _.Im(d, "transitionDuration");
        return d !== "" && d !== "none" && d !== "0s"
      }) ? (0, _.Lo)(() => {
        GEe(a, b)
      }, 300) : GEe(a, b)
    };
    GEe = function (a, b) {
      b ? (a.Ba += 1, a.container.Ffa()) : (a.Ba = 0, a.container.X9())
    };
    _.HEe = class extends _.We {
      constructor(a, b, c) {
        super();
        this.container = a;
        this.Ca = [];
        this.Da = null;
        this.Aa = this.container.qva();
        this.Ca.push(_.cx.subscribe("iehc", d => _.BEe(this, d)));
        this.container.oza() && this.Ca.push(_.cx.subscribe("r", d => {
          this.Aa === d && this.container.HQ(this.container.Cd())
        }));
        this.Ea = b || 1;
        this.Ba = c || 0
      }

      Uc() {
        _.$a(this.Ca, _.dx);
        super.Uc()
      }

      expand() {
        this.container.Ppa() ? FEe(this, !0) : (this.container.HQ(!0), this.container.Ffa(), _.BEe(this, this.Aa, _.EEe(this)))
      }

      collapse() {
        this.container.Ppa() ?
          FEe(this, !1) : (this.container.HQ(!1), this.container.X9(), _.CEe(this), _.BEe(this, this.Aa, _.EEe(this)))
      }

      oa() {
        return this.Da != null && this.Da + 300 > Date.now()
      }
    };
    _.yEe = (a, b = 1, c = 0) => new _.HEe(a, b, c);
    var IEe, JEe, KEe, LEe, NEe, MEe, AEe, OEe;
    IEe = function (a, b) {
      a.Ca.push(b)
    };
    JEe = function (a) {
      _.Jg(a.Ca).then(() => {
        const b = a.Nzb();
        if (b) {
          const c = a.Vmc().filter(d => d.id).map(d => d.id);
          b.setAttribute("aria-controls", c.join(" "))
        }
      })
    };
    KEe = function (a, b) {
      return _.eEe(b) ? (a.Ba = b.event.target, !0) : !1
    };
    LEe = function (a) {
      a.qva().setAttribute("aria-expanded", String(a.XDa()))
    };
    NEe = function (a, b, c) {
      if (!b || _.Wd(b)) {
        var d = MEe(a, 0), e = MEe(a, 1);
        _.ZDe(b, a.qva(), c, d, e)
      }
    };
    MEe = function (a, b) {
      const c = [];
      for (const d of a.RL) d.qca() === b && c.push(d.getRoot().el());
      return c
    };
    AEe = function (a) {
      return a.__mt !== void 0 ? a.__mt : 0
    };
    OEe = function (a) {
      return a.__eb !== void 0 ? a.__eb : 2
    };
    _.cK = class extends _.Dg {
      constructor(a) {
        super(a.Oa);
        this.items = [];
        this.RL = [];
        this.Ga = null;
        this.actions = [];
        this.Ba = null;
        this.Da = !1;
        this.Ca = [];
        this.La = this.getData("quie").Hb();
        this.Ha = this.getData("anim").Hb();
        this.Wa = this.getData("fcss").Hb();
        this.Qid = this.getData("rspae").Hb();
        this.Na = this.getData("fae").Hb();
        this.Aa = this.getData("npd").number(1);
        this.oa = this.getData("iexp").Hb() ? this.Aa : 0;
        this.Ea = zEe(this, this.Aa, this.oa);
        this.wcd = this.getData("slct").string("mnr-c")
      }

      kb() {
        return this.Ca
      }

      Pa() {
        return this.La
      }

      Ya() {
        return this.wcd
      }

      Qx(a) {
        IEe(this,
          this.Mc(a.event.target).then(b => {
            this.items.push(b);
            b.Cd() !== this.Cd() && b.toggle()
          }))
      }

      Fb(a) {
        IEe(this, this.Mc(a.event.target).then(b => {
          this.Ga = b
        }));
        JEe(this)
      }

      Db(a) {
        const b = a.event.target;
        IEe(this, this.Mc(b).then(c => {
          b.__mt = c.gva();
          b.__eb = c.qca();
          this.Ha || _.Gm(b, "transition", "none");
          this.RL.push(c)
        }));
        JEe(this)
      }

      yb(a) {
        IEe(this, this.Mc(a.event.target).then(b => {
          this.actions.push(b)
        }))
      }

      Qa(a) {
        KEe(this, a) && this.toggle()
      }

      Va(a) {
        KEe(this, a) && this.expand()
      }

      Sa(a) {
        KEe(this, a) && this.collapse()
      }

      toggle() {
        this.XDa() ?
          this.collapse() : this.expand()
      }

      XDa() {
        return this.oa >= this.Aa
      }

      expand() {
        this.oa >= this.Aa || this.Da && this.Ea.oa() || _.Jg(this.Ca).then(() => {
          this.Ca.length = 0;
          this.Da = !0;
          this.Ea.expand()
        })
      }

      collapse() {
        this.oa < this.Aa || this.Da && this.Ea.oa() || _.Jg(this.Ca).then(() => {
          this.Ca.length = 0;
          this.Da = !0;
          this.Ea.collapse()
        })
      }

      Cd() {
        return this.oa > 0
      }

      Ppa() {
        return this.Ha
      }

      oza() {
        return !this.La || this.Wa
      }

      Jb() {
        return this.Qid
      }

      Ffa() {
        this.oa += 1;
        this.Da = !1;
        LEe(this);
        for (var a of this.actions) a.auf();
        this.trigger(_.AOb, {JK: this.Ba});
        NEe(this, this.Ba, "expanding");
        this.Ba = null;
        this.Na && (a = _.dDa(this.getRoot().el(), _.Am)) && a.focus()
      }

      X9() {
        this.oa = 0;
        this.Da = !1;
        LEe(this);
        for (const a of this.actions) a.Hrf();
        this.trigger(_.BOb, {JK: this.Ba});
        NEe(this, this.Ba, "collapsing");
        this.Ba = null
      }

      HQ(a) {
        this.Aa <= 1 && (this.oa = a ? this.Aa : 0);
        for (const b of this.items) a ? b.expand() : b.collapse()
      }

      qva() {
        return this.getRoot().el()
      }

      Mzb() {
        return this.Fa("gI9xcc").el()
      }

      Moa() {
        return this.Xa("AHe6Kc").el()
      }

      E2c() {
        return this.Xa("bnBfGc").el()
      }

      Nzb() {
        return this.Ga ?
          this.Ga.getRoot().el() : null
      }

      Vnc() {
        const a = [];
        for (const b of this.RL) b.gva() !== 0 && a.push(b.getRoot().el());
        return a
      }

      Vmc() {
        return [...MEe(this, 0), ...MEe(this, 1)]
      }

      JWd(a) {
        return this.Ga ? this.Ga.Goc(a) : []
      }

      k4d(a) {
        return AEe(a) === 3
      }

      r3d(a) {
        return AEe(a) === 2
      }

      kuc(a) {
        return OEe(a) === 0
      }

      Htc(a) {
        return OEe(a) === 1
      }

      emb(a) {
        return OEe(a) === 2
      }

      Vb() {
        this.Ea.dispose()
      }
    };
    _.J(_.cK.prototype, "k4Iseb", function () {
      return this.Vb
    });
    _.J(_.cK.prototype, "em9Kzd", function () {
      return this.Vmc
    });
    _.J(_.cK.prototype, "Y4cWJb", function () {
      return this.Vnc
    });
    _.J(_.cK.prototype, "kgs1Xc", function () {
      return this.Nzb
    });
    _.J(_.cK.prototype, "nKoqoe", function () {
      return this.E2c
    });
    _.J(_.cK.prototype, "zRB1Df", function () {
      return this.Moa
    });
    _.J(_.cK.prototype, "hOh3bf", function () {
      return this.Mzb
    });
    _.J(_.cK.prototype, "qrngke", function () {
      return this.qva
    });
    _.J(_.cK.prototype, "Yzm1wf", function () {
      return this.X9
    });
    _.J(_.cK.prototype, "sMv6wf", function () {
      return this.Ffa
    });
    _.J(_.cK.prototype, "FoYd", function () {
      return this.Jb
    });
    _.J(_.cK.prototype, "iGSKCe", function () {
      return this.oza
    });
    _.J(_.cK.prototype, "rXu79", function () {
      return this.Ppa
    });
    _.J(_.cK.prototype, "sMVRZe", function () {
      return this.Cd
    });
    _.J(_.cK.prototype, "vhaaFf", function () {
      return this.collapse
    });
    _.J(_.cK.prototype, "KoToPc", function () {
      return this.expand
    });
    _.J(_.cK.prototype, "ZhEbuc", function () {
      return this.XDa
    });
    _.J(_.cK.prototype, "ornU0b", function () {
      return this.toggle
    });
    _.J(_.cK.prototype, "fW2qAb", function () {
      return this.Sa
    });
    _.J(_.cK.prototype, "AvkpRc", function () {
      return this.Va
    });
    _.J(_.cK.prototype, "yELBLe", function () {
      return this.Qa
    });
    _.J(_.cK.prototype, "Z6bwpe", function () {
      return this.yb
    });
    _.J(_.cK.prototype, "AgioGc", function () {
      return this.Db
    });
    _.J(_.cK.prototype, "GsRPff", function () {
      return this.Fb
    });
    _.J(_.cK.prototype, "Nh5q2c", function () {
      return this.Qx
    });
    _.J(_.cK.prototype, "vcEgJc", function () {
      return this.Ya
    });
    _.J(_.cK.prototype, "MT9BLc", function () {
      return this.Pa
    });
    _.J(_.cK.prototype, "d74pFb", function () {
      return this.kb
    });
    _.P(_.gEe, _.cK);

    _.u();
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.JFe = _.w("vJ1l0", []);
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.EOb = function (a) {
      a.trigger(_.lv("xpd_r"))
    };
    _.FOb = function (a) {
      a = a.getRoot().el();
      var b = _.lv("xpd_rt");
      _.Xf(a, b)
    };
    _.GOb = function (a) {
      a = a.getRoot().el();
      var b = _.lv("xpd_rm");
      _.Xf(a, b)
    };
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.q("vJ1l0");
    var KFe = class extends _.Dg {
      static Ra() {
        return {ud: {T9a: {jsname: "Piq9cf", ctor: _.Bg}}}
      }

      constructor(a) {
        super(a.Oa);
        this.expanded = this.getData("xpd").Hb();
        this.root = this.getRoot().el();
        this.T9a = a.ud.T9a;
        this.oa();
        _.EOb(this);
        _.FOb(this)
      }

      toggle() {
        this.expanded ? this.collapse() : this.expand()
      }

      expand() {
        this.expanded || (this.expanded = !0, this.update())
      }

      collapse() {
        this.expanded && (this.expanded = !1, this.update())
      }

      update() {
        if (this.T9a) this.oa(); else {
          var a = this.Xa("zWOLzc").el(), b = this.Fa("mKTrKf").el(), c = this.Fa("GTrWA").el(),
            d = this.Fa("f3VNIf").el(), e = this.Fa("r2H3vf").el();
          _.Cl(b, "mCs3Sb", this.expanded);
          _.Cl(c, "mCs3Sb", this.expanded);
          _.Cl(d, "mCs3Sb", !this.expanded);
          _.Cl(e, "mCs3Sb", !this.expanded);
          b = this.expanded ? e.getAttribute("id") : c.getAttribute("id");
          c = this.expanded ? "true" : "false";
          this.root.hasAttribute("aria-labelledby") && this.root.setAttribute("aria-labelledby", b);
          this.root.setAttribute("aria-expanded", c);
          a != null && (a.setAttribute("aria-labelledby", b), a.setAttribute("aria-expanded", c))
        }
      }

      oa() {
        this.T9a && (this.expanded ?
          this.T9a.collapse() : this.T9a.expand())
      }

      Goc(a) {
        if (this.T9a) return [];
        const b = [];
        a ? (b.push(this.Fa("f3VNIf").el()), b.push(this.Fa("r2H3vf").el())) : (b.push(this.Fa("mKTrKf").el()), b.push(this.Fa("GTrWA").el()));
        return b
      }

      Cd() {
        return this.expanded
      }

      Aa() {
        this.trigger(_.DOb)
      }
    };
    _.J(KFe.prototype, "yELBLe", function () {
      return this.Aa
    });
    _.J(KFe.prototype, "sMVRZe", function () {
      return this.Cd
    });
    _.J(KFe.prototype, "G24v7d", function () {
      return this.oa
    });
    _.J(KFe.prototype, "vhaaFf", function () {
      return this.collapse
    });
    _.J(KFe.prototype, "KoToPc", function () {
      return this.expand
    });
    _.J(KFe.prototype, "ornU0b", function () {
      return this.toggle
    });
    _.P(_.JFe, KFe);
    _.u();
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.xFd = _.w("gSZvdb", []);
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.uFd = _.H("dl3bm");
    _.vFd = _.H("EbPWYd");
  } catch (e) {
    _._DumpException(e)
  }
  try {
    _.q("gSZvdb");
    var yFd = function (a) {
      _.Dv(a.getRoot().el());
      _.wFd("fs");
      a.oa ? _.$f(document, _.BLb, a.data.serialize()) : _.$f(document, _.ALb, a.data);
      _.$f(window.document.body, _.HFb);
      _.mv(a.getRoot().el(), "hide_popup");
      a.Ba && a.trigger(_.vFd)
    }, zFd = class extends _.Dg {
      static Ra() {
        return {jsdata: {nqa: _.kw}}
      }

      constructor(a) {
        super(a.Oa);
        this.Ba = this.getData("msf").Hb();
        this.oa = this.getData("cmep").Hb();
        this.data = a.jsdata.nqa;
        this.Da = this.getRoot().el().getAttribute("data-dccl") === "true"
      }

      Aa() {
        if (this.Da) return !0;
        yFd(this);
        return !1
      }

      Ca(a) {
        _.vMb(this.data,
          a.data);
        yFd(this)
      }
    };
    _.J(zFd.prototype, "yM1YJe", function () {
      return this.Ca
    });
    _.J(zFd.prototype, "i5KCU", function () {
      return this.Aa
    });
    _.P(_.xFd, zFd);
    _.u();
  } catch (e) {
    _._DumpException(e)
  }
})(this._s);
// Google Inc.
