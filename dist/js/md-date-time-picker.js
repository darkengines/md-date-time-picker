'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(),
    _dialog = {
	view: !0,
	state: !1
},
    mdDateTimePicker = function () {
	/**
 * [constructor of the mdDateTimePicker]
 *
 * @method constructor
 *
 * @param  {[string]}    type         [type of dialog] ['date','time']
 * @param  {[moment]}    init   = moment() [initial value for the dialog date or time, defaults to today] [@default value of today]
 * @param  {[moment]}    past   = moment() [the past moment till which the calendar shall render] [@default value of exactly 21 Years ago from init]
 * @param  {[moment]}    future = moment() [the future moment till which the calendar shall render] [@default value of init]
 *
 * @param	 {[Boolean]}    mode  = false [this value tells whether the time dialog will have the 24 hour mode (true) or 12 hour mode (false)] [@default 12 hour mode = false]
 *
 * @return {[Object]}    [mdDateTimePicker]
 */

	function mdDateTimePicker(_ref) {
		var type = _ref.type,
		    _ref$init = _ref.init,
		    init = _ref$init === undefined ? moment() : _ref$init,
		    _ref$past = _ref.past,
		    past = _ref$past === undefined ? moment().subtract(21, 'years') : _ref$past,
		    _ref$future = _ref.future,
		    future = _ref$future === undefined ? init : _ref$future,
		    _ref$mode = _ref.mode,
		    mode = _ref$mode === undefined ? !1 : _ref$mode;

		_classCallCheck(this, mdDateTimePicker);

		this._type = type;
		this._init = init;
		this._past = past;
		this._future = future;
		this._mode = mode;

		/**
  * [dialog selected classes have the same structure as dialog but one level down]
  * @type {Object}
  * e.g
  * sDialog = {
  *   picker: 'some-picker-selected'
  * }
  */
		this._sDialog = {};
		// attach the dialog if not present
		if (!document.getElementById('mddtp-picker__' + this._type)) {
			this._buildDialog();
		}
	}

	/**
 * [upDate to get or set the current picker's moment]
 *
 * @method time
 *
 * @param  {[moment]} m
 *
 */


	_createClass(mdDateTimePicker, [{
		key: 'time',
		value: function time() {
			var m = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

			if (m === '') {
				return this._init;
			} else {
				this._init = m;
			}
		}

		/**
  * [toggle toggle the dialog's between the visible and invisible state]
  *
  * @method toggle
  *
  */

	}, {
		key: 'toggle',
		value: function toggle() {
			this._selectDialog();
			// work according to the current state of the dialog
			if (mdDateTimePicker.dialog.state) {
				this._hideDialog();
			} else {
				if (this._type === 'date') {
					this._initDateDialog(this._init);
				} else if (this._type === 'time') {
					this._initTimeDialog(this._init);
				}
				this._showDialog();
			}
		}

		/**
  * [dialog getter and setter for _dialog value]
  *
  * @method dialog
  *
  * @return {[_dialog]} [static or prototype value for the _dialog of the component]
  */

	}, {
		key: '_selectDialog',


		// REVIEW the code below is unnecessary or necessary
		// static set dialog(value) {
		// 	mdDateTimePicker.dialog = value
		// }

		value: function _selectDialog() {
			// now do what you normally would do
			this._sDialog.picker = document.getElementById('mddtp-picker__' + [this._type]);
			/**
   * [sDialogEls stores all inner components of the selected dialog or sDialog to be later getElementById]
   *
   * @type {Array}
   */
			var sDialogEls = ['viewHolder', 'years', 'header', 'cancel', 'ok', 'left', 'right', 'previous', 'current', 'next', 'subtitle', 'title', 'titleDay', 'titleMonth', 'AM', 'PM', 'needle', 'hourView', 'minuteView', 'hour', 'minute'],
			    i = sDialogEls.length;

			while (i--) {
				this._sDialog[sDialogEls[i]] = document.getElementById('mddtp-' + this._type + '__' + sDialogEls[i]);
			}

			this._sDialog.tDate = this._init.clone();
			this._sDialog.sDate = this._init.clone();
		}

		/**
  * [_showDialog make the dialog visible with animation]
  *
  * @method _showDialog
  *
  */

	}, {
		key: '_showDialog',
		value: function _showDialog() {
			var me = this;
			mdDateTimePicker.dialog.state = !0;
			this._sDialog.picker.classList.remove('mddtp-picker--inactive');
			this._sDialog.picker.classList.add('zoomIn');
			setTimeout(function () {
				me._sDialog.picker.classList.remove('zoomIn');
			}, 300);
		}

		/**
  * [_hideDialog make the dialog invisible with animation]
  *
  * @method _hideDialog
  *
  */

	}, {
		key: '_hideDialog',
		value: function _hideDialog() {
			var me = this,
			    years = this._sDialog.years,
			    title = me._sDialog.title,
			    subtitle = me._sDialog.subtitle,
			    viewHolder = this._sDialog.viewHolder,
			    AM = this._sDialog.AM,
			    PM = this._sDialog.PM,
			    minute = this._sDialog.minute,
			    hour = this._sDialog.hour,
			    minuteView = this._sDialog.minuteView,
			    hourView = this._sDialog.hourView,
			    picker = this._sDialog.picker;

			mdDateTimePicker.dialog.state = !1;
			mdDateTimePicker.dialog.view = !0;
			this._sDialog.picker.classList.add('zoomOut');
			// reset classes
			if (this._type === 'date') {
				years.classList.remove('zoomIn', 'zoomOut');
				years.classList.add('mddtp-picker__years--invisible');
				title.classList.remove('mddtp-picker__color--active');
				subtitle.classList.add('mddtp-picker__color--active');
				viewHolder.classList.remove('zoomOut');
			} else {
				AM.classList.remove('mddtp-picker__color--active');
				PM.classList.remove('mddtp-picker__color--active');
				minute.classList.remove('mddtp-picker__color--active');
				hour.classList.add('mddtp-picker__color--active');
				minuteView.classList.add('mddtp-picker__circularView--hidden');
				hourView.classList.remove('mddtp-picker__circularView--hidden');
				subtitle.setAttribute('style', 'display: none');
			}
			setTimeout(function () {
				me._sDialog.picker.classList.remove('zoomOut');
				me._sDialog.picker.classList.add('mddtp-picker--inactive');
				// clone elements and add them again to clear events attached to them
				var pickerClone = picker.cloneNode(!0);
				picker.parentNode.replaceChild(pickerClone, picker);
			}, 300);
		}

		/**
  * [_buildDialog make the dialog elements and add them to the document]
  *
  * @method _buildDateDialog
  *
  */

	}, {
		key: '_buildDialog',
		value: function _buildDialog() {
			var type = this._type,
			    docfrag = document.createDocumentFragment(),
			    container = document.createElement('div'),
			    header = document.createElement('div'),
			    body = document.createElement('div'),
			    action = document.createElement('div'),
			    cancel = document.createElement('button'),
			    ok = document.createElement('button');
			// outer most container of the picker

			// header container of the picker

			// body container of the picker

			// action elements container

			// ... add properties to them
			container.id = 'mddtp-picker__' + type;
			container.classList.add('mddtp-picker', 'mddtp-picker-' + type, 'mddtp-picker--inactive', 'animated');
			this._addId(header, 'header');
			this._addClass(header, 'header');
			// add header to container
			container.appendChild(header);
			this._addClass(body, 'body');
			body.appendChild(action);
			// add body to container
			container.appendChild(body);
			// add stuff to header and body according to dialog type
			if (this._type === 'date') {
				var subtitle = document.createElement('h4'),
				    title = document.createElement('h2'),
				    titleDay = document.createElement('div'),
				    titleMonth = document.createElement('div'),
				    viewHolder = document.createElement('div'),
				    views = document.createElement('ul'),
				    previous = document.createElement('li'),
				    current = document.createElement('li'),
				    next = document.createElement('li'),
				    left = document.createElement('button'),
				    right = document.createElement('button'),
				    years = document.createElement('ul');

				// inside header
				// adding properties to them
				this._addId(subtitle, 'subtitle');
				this._addClass(subtitle, 'subtitle', ['mddtp-picker__color--active']);
				this._addId(title, 'title');
				this._addClass(title, 'title');
				this._addId(titleDay, 'titleDay');
				this._addId(titleMonth, 'titleMonth');
				// add title stuff to it
				title.appendChild(titleDay);
				title.appendChild(titleMonth);
				// add them to header
				header.appendChild(subtitle);
				header.appendChild(title);
				// inside body
				// inside viewHolder
				this._addId(viewHolder, 'viewHolder');
				this._addClass(viewHolder, 'viewHolder', ['animated']);
				this._addClass(views, 'views');
				this._addId(previous, 'previous');
				previous.classList.add('mddtp-picker__view');
				this._addId(current, 'current');
				current.classList.add('mddtp-picker__view');
				this._addId(next, 'next');
				next.classList.add('mddtp-picker__view');
				// fill the views
				this._addView(previous);
				this._addView(current);
				this._addView(next);
				// add them
				viewHolder.appendChild(views);
				views.appendChild(previous);
				views.appendChild(current);
				views.appendChild(next);
				// inside body again
				this._addId(left, 'left');
				left.classList.add('mddtp-button');
				this._addClass(left, 'left');
				left.setAttribute('type', 'button');
				this._addId(right, 'right');
				right.classList.add('mddtp-button');
				this._addClass(right, 'right');
				right.setAttribute('type', 'button');
				this._addId(years, 'years');
				this._addClass(years, 'years', ['mddtp-picker__years--invisible', 'animated']);
				// add them to body
				body.appendChild(viewHolder);
				body.appendChild(left);
				body.appendChild(right);
				body.appendChild(years);
			} else {}
			action.classList.add('mddtp-picker__action');
			this._addId(cancel, 'cancel');
			cancel.classList.add('mddtp-button');
			cancel.setAttribute('type', 'button');
			cancel.textContent = 'cancel';
			this._addId(ok, 'ok');
			ok.classList.add('mddtp-button');
			ok.setAttribute('type', 'button');
			ok.textContent = 'ok';
			// add actions
			action.appendChild(cancel);
			action.appendChild(ok);
			// add actions to body
			body.appendChild(action);
			docfrag.appendChild(container);
			// add the container to the end of body
			document.getElementsByTagName('body').item(0).appendChild(docfrag);
		}

		/**
  * [_initTimeDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
  * @param  {[moment]} m [date for today or current]
  */

	}, {
		key: '_initTimeDialog',
		value: function _initTimeDialog(m) {
			var hour = this._sDialog.hour,
			    minute = this._sDialog.minute,
			    subtitle = this._sDialog.subtitle;

			// switch according to 12 hour or 24 hour mode
			if (this._mode) {
				hour.innerHTML = m.format('H');
			} else {
				hour.innerHTML = m.format('h');
				this._sDialog[m.format('A')].classList.add('mddtp-picker__color--active');
				subtitle.removeAttribute('style');
			}
			minute.innerHTML = m.format('mm');
			this._initHour();
			this._initMinute();
			this._attachEventHandlers();
			this._changeM();
			this._switchToView(hour);
			this._switchToView(minute);
		}
	}, {
		key: '_initHour',
		value: function _initHour() {
			var hourView = this._sDialog.hourView,
			    needle = this._sDialog.needle,
			    docfrag = document.createDocumentFragment();

			if (this._mode) {
				var hourNow = parseInt(this._sDialog.tDate.format('H'), 10);
			} else {
				var _hourNow = parseInt(this._sDialog.tDate.format('h'), 10);
				for (var i = 1, j = 5; i <= 12; i++, j += 5) {
					var div = document.createElement('div'),
					    span = document.createElement('span');

					div.classList.add('mddtp-picker__cell');
					span.textContent = i;
					div.classList.add('mddtp-picker__cell--rotate-' + j);
					if (_hourNow === i) {
						div.classList.add('mddtp-picker__cell--selected');
						needle.classList.add('mddtp-picker__cell--rotate-' + j);
					}
					div.appendChild(span);
					docfrag.appendChild(div);
				}
			}
			//empty the hours
			while (hourView.lastChild) {
				hourView.removeChild(hourView.lastChild);
			}
			// set inner html accordingly
			hourView.appendChild(docfrag);
		}
	}, {
		key: '_initMinute',
		value: function _initMinute() {
			var minuteView = this._sDialog.minuteView,
			    minuteNow = parseInt(this._sDialog.tDate.format('mm'), 10),
			    docfrag = document.createDocumentFragment();

			for (var i = 5, j = 5; i <= 60; i += 5, j += 5) {
				var div = document.createElement('div'),
				    div1 = document.createElement('div'),
				    div2 = document.createElement('div'),
				    div3 = document.createElement('div'),
				    div4 = document.createElement('div'),
				    span = document.createElement('span'),
				    span1 = document.createElement('span'),
				    span2 = document.createElement('span'),
				    span3 = document.createElement('span'),
				    span4 = document.createElement('span');

				span1.textContent = '.';
				span2.textContent = '.';
				span3.textContent = '.';
				span4.textContent = '.';
				div.classList.add('mddtp-picker__cell');
				div1.classList.add('mddtp-picker__cell');
				div2.classList.add('mddtp-picker__cell');
				div3.classList.add('mddtp-picker__cell');
				div4.classList.add('mddtp-picker__cell');
				if (i === 60) {
					span.textContent = this._numWithZero(0);
				} else {
					span.textContent = this._numWithZero(i);
				}
				div.classList.add('mddtp-picker__cell--rotate-' + j);
				div1.classList.add('mddtp-picker__cell--rotate-' + (j - 4));
				div2.classList.add('mddtp-picker__cell--rotate-' + (j - 3));
				div3.classList.add('mddtp-picker__cell--rotate-' + (j - 2));
				div4.classList.add('mddtp-picker__cell--rotate-' + (j - 1));
				if (minuteNow == i || minuteNow - 1 == i || minuteNow + 1 == i) {
					div.classList.add('mddtp-picker__cell--selected');
				}
				div.appendChild(span);
				div1.appendChild(span1);
				div2.appendChild(span2);
				div3.appendChild(span3);
				div4.appendChild(span4);
				docfrag.appendChild(div);
				docfrag.appendChild(div1);
				docfrag.appendChild(div2);
				docfrag.appendChild(div3);
				docfrag.appendChild(div4);
			}
			//empty the hours
			while (minuteView.lastChild) {
				minuteView.removeChild(minuteView.lastChild);
			}
			// set inner html accordingly
			minuteView.appendChild(docfrag);
		}

		/**
  * [initDateDialog to initiate the date picker dialog usage e.g initDateDialog(moment())]
  * @param  {[moment]} m [date for today or current]
  */

	}, {
		key: '_initDateDialog',
		value: function _initDateDialog(m) {
			var subtitle = this._sDialog.subtitle,
			    title = this._sDialog.title,
			    titleDay = this._sDialog.titleDay,
			    titleMonth = this._sDialog.titleMonth;

			subtitle.innerHTML = m.format('YYYY');
			titleDay.innerHTML = m.format('ddd, ');
			titleMonth.innerHTML = m.format('MMM D');
			this._initYear();
			this._initViewHolder();
			this._attachEventHandlers();
			this._changeMonth();
			this._switchToView(subtitle);
			this._switchToView(title);
		}
	}, {
		key: '_initViewHolder',
		value: function _initViewHolder() {
			var m = this._sDialog.tDate,
			    picker = this._sDialog.picker,
			    current = this._sDialog.current,
			    previous = this._sDialog.previous,
			    next = this._sDialog.next,
			    past = this._past,
			    future = this._future;

			if (m.isBefore(past, 'month')) {
				m = past.clone();
			}
			if (m.isAfter(future, 'month')) {
				m = future.clone();
			}
			this._sDialog.tDate = m;
			this._initMonth(current, m);
			this._initMonth(next, moment(this._getMonth(m, 1)));
			this._initMonth(previous, moment(this._getMonth(m, -1)));
			this._switchToView(current.querySelector('.mddtp-picker__month'));
			this._toMoveMonth();
		}
	}, {
		key: '_initMonth',
		value: function _initMonth(view, m) {
			var displayMonth = m.format('MMMM YYYY');
			view.querySelector('.mddtp-picker__month').innerHTML = displayMonth;
			var docfrag = document.createDocumentFragment(),
			    tr = view.querySelector('.mddtp-picker__tr'),
			    firstDayOfMonth = parseInt(moment(m).date(1).day(), 10),
			    today = -1,
			    selected = -1,
			    lastDayOfMonth = parseInt(moment(m).endOf('month').format('D'), 10) + firstDayOfMonth - 1,
			    past = firstDayOfMonth,
			    future = lastDayOfMonth;

			if (moment().isSame(m, 'month')) {
				today = parseInt(moment().format('D'), 10);
				today += firstDayOfMonth - 1;
			}
			if (this._past.isSame(m, 'month')) {
				past = parseInt(this._past.format('D'), 10);
				past += firstDayOfMonth - 1;
			}
			if (this._future.isSame(m, 'month')) {
				future = parseInt(this._future.format('D'), 10);
				future += firstDayOfMonth - 1;
			}
			if (this._sDialog.sDate.isSame(m, 'month')) {
				selected = parseInt(moment(m).format('D'), 10);
				selected += firstDayOfMonth - 1;
			}
			for (var i = 0; i < 42; i++) {
				// create cell
				var cell = document.createElement('span'),
				    currentDay = i - firstDayOfMonth + 1;

				if (i >= firstDayOfMonth && i <= lastDayOfMonth) {
					if (i > future || i < past) {
						cell.classList.add('mddtp-picker__cell--disabled');
					} else {
						cell.classList.add('mddtp-picker__cell');
					}
					cell.innerHTML = currentDay;
				}
				if (today === i) {
					cell.classList.add('mddtp-picker__cell--today');
				}
				if (selected === i) {
					cell.classList.add('mddtp-picker__cell--selected');
				}
				docfrag.appendChild(cell);
			}
			//empty the tr
			while (tr.lastChild) {
				tr.removeChild(tr.lastChild);
			}
			// set inner html accordingly
			tr.appendChild(docfrag);
			this._addCellClickEvent(tr);
		}

		/**
  * [_initYear Adds year elements]
  *
  * @method _initYear
  *
  * @return {[type]}  [description]
  */

	}, {
		key: '_initYear',
		value: function _initYear() {
			var years = this._sDialog.years,
			    currentYear = this._sDialog.tDate.year(),
			    docfrag = document.createDocumentFragment(),
			    past = this._past.year(),
			    future = this._future.year();

			for (var year = past; year <= future; year++) {
				var li = document.createElement('li');
				li.textContent = year;
				if (year === currentYear) {
					li.id = 'mddtp-date__currentYear';
					li.classList.add('mddtp-picker__li--current');
				}
				docfrag.appendChild(li);
			}
			//empty the years ul
			while (years.lastChild) {
				years.removeChild(years.lastChild);
			}
			// set inner html accordingly
			years.appendChild(docfrag);
			// attach event handler to the ul to get the benefit of event delegation
			this._changeYear(years);
		}

		/**
  * [_switchToView Adds event handler for the feature: switch between date and year view in date dialog]
  *
  * @method _switchToView
  *
  * @param  {[type]} picker [description]
  *
  * @param  {[type]} el     [description]
  *
  */

	}, {
		key: '_switchToView',
		value: function _switchToView(el) {
			var me = this;
			// attach the view change button
			if (this._type == 'date') {
				el.addEventListener('click', function () {
					me._switchToDateView(el, me);
				});
			} else {
				el.addEventListener('click', function () {
					me._switchToTimeView(el, me);
				});
			}
		}

		/**
  * [_switchToTimeView the actual switchToDateView function so that it can be called by other elements as well]
  *
  * @method _switchToTimeView
  *
  * @param  {[type]}          el [element to attach event to]
  * @param  {[type]}          me [context]
  *
  */

	}, {
		key: '_switchToTimeView',
		value: function _switchToTimeView(el, me) {
			var hourView = this._sDialog.hourView,
			    minuteView = this._sDialog.minuteView,
			    hour = this._sDialog.hour,
			    minute = this._sDialog.minute,
			    activeClass = 'mddtp-picker__color--active',
			    needle = this._sDialog.needle,
			    spoke = 60,
			    value = void 0;

			// toggle view classes
			hourView.classList.toggle('mddtp-picker__circularView--hidden');
			minuteView.classList.toggle('mddtp-picker__circularView--hidden');
			hour.classList.toggle(activeClass);
			minute.classList.toggle(activeClass);
			// move the needle to correct position
			needle.className = '';
			needle.classList.add('mddtp-picker__selection');
			if (mdDateTimePicker.dialog.view) {
				value = this._sDialog.tDate.format('m');
			} else {
				if (this._mode) {
					spoke = 24;
					value = this._sDialog.tDate.format('H');
				} else {
					spoke = 12;
					value = this._sDialog.tDate.format('h');
				}
			}
			var rotationClass = this._calcRotation(spoke, parseInt(value, 10));
			if (rotationClass) {
				needle.classList.add(rotationClass);
			}
			mdDateTimePicker.dialog.view = !mdDateTimePicker.dialog.view;
		}
		/**
  * [_switchToDateView the actual switchToDateView function so that it can be called by other elements as well]
  *
  * @method _switchToDateView
  *
  * @param  {[type]}	el [element to attach event to]
  * @param  {[type]}	me [context]
  *
  */

	}, {
		key: '_switchToDateView',
		value: function _switchToDateView(el, me) {
			el.setAttribute('disabled', '');
			var viewHolder = me._sDialog.viewHolder,
			    years = me._sDialog.years,
			    title = me._sDialog.title,
			    subtitle = me._sDialog.subtitle,
			    currentYear = document.getElementById('mddtp-date__currentYear');

			if (mdDateTimePicker.dialog.view) {
				viewHolder.classList.add('zoomOut');
				years.classList.remove('mddtp-picker__years--invisible');
				years.classList.add('zoomIn');
				// scroll into the view
				currentYear.scrollIntoViewIfNeeded();
			} else {
				years.classList.add('zoomOut');
				viewHolder.classList.remove('zoomOut');
				viewHolder.classList.add('zoomIn');
				setTimeout(function () {
					years.classList.remove('zoomIn', 'zoomOut');
					years.classList.add('mddtp-picker__years--invisible');
					viewHolder.classList.remove('zoomIn');
				}, 300);
			}
			title.classList.toggle('mddtp-picker__color--active');
			subtitle.classList.toggle('mddtp-picker__color--active');
			mdDateTimePicker.dialog.view = !mdDateTimePicker.dialog.view;
			setTimeout(function () {
				el.removeAttribute('disabled');
			}, 300);
		}
	}, {
		key: '_addCellClickEvent',
		value: function _addCellClickEvent(el) {
			var me = this;
			el.addEventListener('click', function (e) {
				if (e.target && e.target.nodeName == 'SPAN' && e.target.classList.contains('mddtp-picker__cell')) {
					var picker = me._sDialog.picker,
					    day = e.target.innerHTML,
					    currentDate = me._sDialog.tDate.date(day),
					    selected = picker.querySelector('.mddtp-picker__cell--selected'),
					    subtitle = me._sDialog.subtitle,
					    titleDay = me._sDialog.titleDay,
					    titleMonth = me._sDialog.titleMonth;

					if (selected) {
						selected.classList.remove('mddtp-picker__cell--selected');
					}
					e.target.classList.add('mddtp-picker__cell--selected');

					// update temp date object with the date selected
					me._sDialog.sDate = currentDate.clone();
					subtitle.innerHTML = currentDate.year();
					titleDay.innerHTML = currentDate.format('ddd, ');
					titleMonth.innerHTML = currentDate.format('MMM D');
				}
			});
		}
	}, {
		key: '_toMoveMonth',
		value: function _toMoveMonth() {
			var m = this._sDialog.tDate,
			    left = this._sDialog.left,
			    right = this._sDialog.right,
			    past = this._past,
			    future = this._future;

			left.removeAttribute('disabled');
			right.removeAttribute('disabled');
			left.classList.remove('mddtp-button--disabled');
			right.classList.remove('mddtp-button--disabled');
			if (m.isSame(past, 'month')) {
				left.setAttribute('disabled', '');
				left.classList.add('mddtp-button--disabled');
			}
			if (m.isSame(future, 'month')) {
				right.setAttribute('disabled', '');
				right.classList.add('mddtp-button--disabled');
			}
		}
	}, {
		key: '_changeMonth',
		value: function _changeMonth() {
			var me = this,
			    left = this._sDialog.left,
			    right = this._sDialog.right,
			    mLeftClass = 'mddtp-picker__view--left',
			    mRightClass = 'mddtp-picker__view--right',
			    pause = 'mddtp-picker__view--pause';

			left.addEventListener('click', function () {
				moveStep(mRightClass, me._sDialog.previous);
			});

			right.addEventListener('click', function () {
				moveStep(mLeftClass, me._sDialog.next);
			});

			function moveStep(aClass, to) {
				/**
    * [stepBack to know if the to step is going back or not]
    *
    * @type {Boolean}
    */
				var stepBack = !1,
				    next = me._sDialog.next,
				    current = me._sDialog.current,
				    previous = me._sDialog.previous;

				left.setAttribute('disabled', '');
				right.setAttribute('disabled', '');
				current.classList.add(aClass);
				previous.classList.add(aClass);
				next.classList.add(aClass);
				var clone = to.cloneNode(!0),
				    del = void 0;

				if (to === next) {
					del = previous;
					current.parentNode.appendChild(clone);
					next.id = current.id;
					current.id = previous.id;
					previous = current;
					current = next;
					next = clone;
				} else {
					stepBack = !0;
					del = next;
					previous.id = current.id;
					current.id = next.id;
					next = current;
					current = previous;
				}
				setTimeout(function () {
					if (to === previous) {
						current.parentNode.insertBefore(clone, current);
						previous = clone;
					}
					// update real values to match these values
					me._sDialog.next = next;
					me._sDialog.current = current;
					me._sDialog.previous = previous;
					current.classList.add(pause);
					next.classList.add(pause);
					previous.classList.add(pause);
					current.classList.remove(aClass);
					next.classList.remove(aClass);
					previous.classList.remove(aClass);
					del.parentNode.removeChild(del);
				}, 300);
				// REVIEW replace below code with requestAnimationFrame
				setTimeout(function () {
					current.classList.remove(pause);
					next.classList.remove(pause);
					previous.classList.remove(pause);
					if (stepBack) {
						me._sDialog.tDate = me._getMonth(me._sDialog.tDate, -1);
					} else {
						me._sDialog.tDate = me._getMonth(me._sDialog.tDate, 1);
					}
					me._initViewHolder();
				}, 350);
				setTimeout(function () {
					if (!left.classList.contains('mddtp-button--disabled')) {
						left.removeAttribute('disabled');
					}
					if (!right.classList.contains('mddtp-button--disabled')) {
						right.removeAttribute('disabled');
					}
				}, 400);
			}
		}

		/**
  * [_changeYear the on click event handler for year]
  *
  * @method _changeYear
  *
  * @param  {[type]}    el [description]
  *
  */

	}, {
		key: '_changeYear',
		value: function _changeYear(el) {
			var me = this;
			el.addEventListener('click', function (e) {
				if (e.target && e.target.nodeName == 'LI') {
					var selected = document.getElementById('mddtp-date__currentYear');
					// clear previous selected
					selected.id = '';
					selected.classList.remove('mddtp-picker__li--current');
					// add the properties to the newer one
					e.target.id = 'mddtp-date__currentYear';
					e.target.classList.add('mddtp-picker__li--current');
					// switch view
					me._switchToDateView(el, me);
					// set the tdate to it
					me._sDialog.tDate.year(parseInt(e.target.innerHTML, 10));
					// update the dialog
					me._initViewHolder();
				}
			});
		}

		/**
  * [_changeM switch between am and pm modes]
  *
  * @method _changeM
  *
  * @return {[type]} [description]
  */

	}, {
		key: '_changeM',
		value: function _changeM() {
			var me = this,
			    AM = this._sDialog.AM,
			    PM = this._sDialog.PM;

			AM.addEventListener('click', function (e) {
				var m = me._sDialog.sDate.format('A');
				if (m === 'PM') {
					me._sDialog.sDate.subtract(12, 'h');
					AM.classList.toggle('mddtp-picker__color--active');
					PM.classList.toggle('mddtp-picker__color--active');
				}
			});
			PM.addEventListener('click', function (e) {
				var m = me._sDialog.sDate.format('A');
				if (m === 'AM') {
					me._sDialog.sDate.add(12, 'h');
					AM.classList.toggle('mddtp-picker__color--active');
					PM.classList.toggle('mddtp-picker__color--active');
				}
			});
		}

		/**
  * [_attachEventHandlers attach event handlers for actions to the date or time picker dialog]
  *
  * @method _attachEventHandlers
  *
  */

	}, {
		key: '_attachEventHandlers',
		value: function _attachEventHandlers() {
			var me = this,
			    ok = this._sDialog.ok,
			    cancel = this._sDialog.cancel;

			cancel.addEventListener('click', function () {
				me.toggle();
			});
			ok.addEventListener('click', function () {
				me._init = me._sDialog.sDate;
				me.toggle();
			});
		}

		/**
  * [_getMonth get the next or previous month]
  *
  * @method _getMonth
  *
  * @param  {[type]}  moment [description]
  * @param  {[type]}  count  [pass -ve values for past months and positive ones for future values]
  *
  * @return {[moment]}  [returns the relative moment]
  */

	}, {
		key: '_getMonth',
		value: function _getMonth(moment, count) {
			var m = void 0;
			m = moment.clone();
			if (count > 0) {
				return m.add(Math.abs(count), 'M');
			} else {
				return m.subtract(Math.abs(count), 'M');
			}
		}

		/**
  * [_numWithZero returns string number (n) with a prefixed 0 if 0 <= n <= 9]
  *
  * @method _numWithZero
  *
  * @param  {[int]}     n [description]
  *
  * @return {[string]}     [description]
  */

	}, {
		key: '_numWithZero',
		value: function _numWithZero(n) {
			return n > 9 ? '' + n : '0' + n;
		}

		/**
  * [_addId add id to picker element]
  *
  * @method _addId
  *
  * @param  {[type]} el [description]
  */

	}, {
		key: '_addId',
		value: function _addId(el, id) {
			el.id = 'mddtp-' + this._type + '__' + id;
		}

		/**
  * [_addClass add the default class to picker element]
  *
  * @method _addClass
  *
  * @param  {[type]}  el    [description]
  * @param  {[type]}  class [description]
  * @param  {[type]}  more [description]
  */

	}, {
		key: '_addClass',
		value: function _addClass(el, aClass, more) {
			el.classList.add('mddtp-picker__' + aClass);
			var i = 0;
			if (more) {
				i = more.length;
				more.reverse();
			}
			while (i--) {
				el.classList.add(more[i]);
			}
		}

		/**
  * [_addView add view]
  *
  * @method _addView
  *
  * @param  {[type]} view [description]
  */

	}, {
		key: '_addView',
		value: function _addView(view) {
			var month = document.createElement('div'),
			    grid = document.createElement('div'),
			    th = document.createElement('div'),
			    tr = document.createElement('div'),
			    weekDays = ['S', 'F', 'T', 'W', 'T', 'M', 'S'],
			    week = 6;

			while (week--) {
				var span = document.createElement('span');
				span.textContent = weekDays[week];
				th.appendChild(span);
			}
			// add properties to them
			this._addClass(month, 'month');
			this._addClass(grid, 'grid');
			this._addClass(th, 'th');
			this._addClass(tr, 'tr');
			// add them to the view
			view.appendChild(month);
			view.appendChild(grid);
			grid.appendChild(th);
			grid.appendChild(tr);
		}

		/**
  * [_calcRotation calculate rotated angle and return the appropriate class for it]
  *
  * @method _calcRotation
  *
  * @param  {[int]}      spoke [spoke is the spoke count = [12,24,60]]
  *
  * @param  {[int]}      value [value for the spoke]
  *
  * @return {[string]}      [appropriate class]
  */

	}, {
		key: '_calcRotation',
		value: function _calcRotation(spoke, value) {
			var start = spoke / 12 * 3,
			    multiplicativeFactor = void 0;

			// set clocks top and right side value
			if (spoke === 12) {
				multiplicativeFactor = 5;
			} else if (spoke === 24) {
				// REVIEW this multiplicativeFactor and also revise css classes for this style
				multiplicativeFactor = 10;
			} else {
				multiplicativeFactor = 1;
			}
			return 'mddtp-picker__cell--rotate-' + value * multiplicativeFactor;
		}
	}], [{
		key: 'dialog',
		get: function get() {
			return _dialog;
		}
	}]);

	return mdDateTimePicker;
}(); /**
     * @package md-date-time-picker
     * @version [0.0.1]
     * @author Puranjay Jain <puranjay.jain@st.niituniversity.in>
     * @license MIT
     * @website puranjayjain.github.io/md-date-time-picker/demo.html
     */

/**
* All declarations starting with _ are considered @private
*/


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// polyfill for scrollintoviewifneeded
if (!Element.prototype.scrollIntoViewIfNeeded) {
	Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
		centerIfNeeded = arguments.length === 0 ? !0 : !!centerIfNeeded;

		var parent = this.parentNode,
		    parentComputedStyle = window.getComputedStyle(parent, null),
		    parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width'), 10),
		    parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width'), 10),
		    overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
		    overBottom = this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth > parent.scrollTop + parent.clientHeight,
		    overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
		    overRight = this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth > parent.scrollLeft + parent.clientWidth,
		    alignWithTop = overTop && !overBottom;

		if ((overTop || overBottom) && centerIfNeeded) {
			parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
		}

		if ((overLeft || overRight) && centerIfNeeded) {
			parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
		}

		if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
			this.scrollIntoView(alignWithTop);
		}
	};
}