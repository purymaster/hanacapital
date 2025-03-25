(function ($) {

  /* GNB 제어 */
  const handleGnb = () => {
    const $gnbItems = $('header .gnb > li');

    $gnbItems.on('mouseenter', function () {
      $(this).addClass('hover');
    }).on('mouseleave', function () {
      $(this).removeClass('hover');
    }).find('a').on('click', function () {
      $gnbItems.removeClass('hover');
    });
  }

  /* SNB 제어 */
  const handleSnb = () => {
    $('header .snb .show').on('click', function () {
      const $snb = $('.snb');
      $snb.toggleClass('on');

      if (!$snb.hasClass('on')) {
        $snb.find('.sub').stop().slideUp();
        $snb.find('li').removeClass('on');
      }
    });

    $('header .snb .tit').on('click', function () {
      const $currentTitle = $(this);
      const $currentSubMenu = $currentTitle.next('.sub');
      $('header .snb .sub').stop().slideUp();
      if ($currentSubMenu.is(':visible')) {
        $currentTitle.parent().removeClass('on');
      } else {
        $currentSubMenu.stop().slideDown();
        $currentTitle.parent().addClass('on').siblings().removeClass('on');
      }
    });
  }

  /* Input 제어 */
  const handleInput = () => {
    const $inputGroup = $('[data-input-group]');

    $inputGroup.each(function () {
      const $currentInput = $(this).find('input[type="text"], input[type="password"], input[type="email"]');

      $currentInput.on('input', function () {
        const $this = $(this);
        $this.next('.input_ctr').toggleClass('on', $this.val() !== '');
      });

      $(this).find('.clear').on('click', function () {
        $currentInput.val('').next('.input_ctr').removeClass('on');
      });

      $(this).find('.pw').on('click', function () {
        if ($currentInput.prop('type') === 'password') {
          $currentInput.prop('type', 'text');
          $(this).addClass('on');
        } else {
          $currentInput.prop('type', 'password');
          $(this).removeClass('on');
        }
      });
    });
  };

  /* Dropdown 제어 */
  const handleDropdown = () => {
    const $dropdown = $('[data-dropdown]');

    $dropdown.each(function () {
      const $currentDropdown = $(this);
      const $dropdownToggle = $currentDropdown.find('.toggle');
      const $items = $currentDropdown.find('.item');

      if ($currentDropdown.hasClass('disabled')) return;

      $dropdownToggle.on('click', function (event) {
        event.stopPropagation();
        $dropdown.each(function () {
          const $otherDropdown = $(this);
          if ($otherDropdown[0] !== $currentDropdown[0]) {
            $otherDropdown.find('.toggle').removeClass('on');
          }
        });
        $(this).toggleClass('on');
      });

      $items.on('click', function () {
        const $this = $(this);
        $this.parent().addClass('on').siblings().removeClass('on');
        $dropdownToggle.focus().removeClass('on').addClass('selected').find('.txt').text($this.text());
      });
    });

    $(document).on('click', function () {
      $dropdown.find('.toggle').removeClass('on');
    });
  }

  /* 탭메뉴 제어 */
  const handleTabMenu = () => {
    $("[data-tab]").each(function () {
      const $tabMenu = $(this);
      const group = $tabMenu.data("tab");
      const $tabMenus = $tabMenu.find("button, a");
      const $tabPages = $(`[data-tab-pages="${group}"] .tab_page`);

      $tabMenus.removeClass("on").first().addClass("on");
      $tabPages.hide().first().show();

      $tabMenus.on("click", function () {
        const targetId = $(this).data("tab-target");
        const $targetPage = $(`#${targetId}`);
        $(this).addClass("on").siblings().removeClass("on");
        $targetPage.show().siblings('.tab_page').hide();
      });
    });
  };

  /* GNB 탭 제어 */
  const handleGnbTab = () => {
    let gnbTabArray = [];
    const MAX_TABS = 15;

    // 탭 추가
    function addTab(text, dataCode) {
      gnbTabArray.push(dataCode);
      const $tabList = $('header .tab ul');
      const tabHtml = `
    <li>
      ${text} 
      <button type="button" class="close" data-code="${dataCode}">탭 삭제</button>
    </li>`;

      $tabList.append(tabHtml).find('li').removeClass('on').last().addClass('on');
      updateTabOffsets();

      $('header .tab .tab_wrap').animate({
        scrollLeft: $tabList.width()
      });
    }

    // 탭 삭제
    function removeTab(dataCode) {
      const index = gnbTabArray.indexOf(dataCode);
      if (index > -1) {
        gnbTabArray.splice(index, 1);
      }

      const $tabToRemove = $(`.tab li:has(button[data-code="${dataCode}"])`);
      $tabToRemove.remove();

      // 활성화된 탭 삭제 시, 탭 목록 중 가장 마지막 탭을 활성화
      if ($('header .tab li.on').length === 0) {
        const $lastTab = $('.tab li:last');
        if ($lastTab.length) {
          $lastTab.addClass('on');
        }
      }

      updateTabOffsets();
    }

    // 탭 오프셋 업데이트
    function resetSnb() {
      const $snb = $('.snb');
      $snb.removeClass('on');
      $snb.find('.sub').stop().slideUp();
      $snb.find('li').removeClass('on');
    }

    function updateTabOffsets() {
      $('header .tab li').each(function () {
        const offset = $(this).offset().left - $(this).parent().offset().left;
        $(this).attr('data-offset-left', offset);
      });
    }

    $('header .gnb a,header .snb a').on('click', function () {
      const $this = $(this);
      const text = $this.text();
      const dataCode = $this.data('code');

      // 중복 체크
      if (gnbTabArray.includes(dataCode)) {
        $(`header .tab li:has(button[data-code="${dataCode}"])`).addClass('on').siblings().removeClass('on');
        $('header .tab .tab_wrap').animate({
          scrollLeft: $(`.tab li:has(button[data-code="${dataCode}"])`).data('offset-left')
        });
        if ($this.closest('.snb').length) {
          resetSnb();
        }
        return;
      }

      // 탭 최대 개수 제한 체크
      if (gnbTabArray.length >= MAX_TABS) {
        showToast(`탭은 최대 ${MAX_TABS}개까지만 추가할 수 있습니다.`);
        return;
      }

      addTab(text, dataCode);
      if ($this.closest('.snb').length) {
        resetSnb();
      }
    });

    // 탭 클릭 및 삭제
    $('header .tab').on('click', 'li', function () {
      $(this).addClass('on').siblings().removeClass('on');
    })
      .on('click', '.close', function (event) {
        event.stopPropagation();
        const dataCode = $(this).data('code');
        removeTab(dataCode);
      });

    // 탭 모두 닫기
    $('header .tab .ctr .close').on('click', function () {
      $('header .tab ul').empty();
      gnbTabArray = [];
    });

    // 탭 시작과 끝 이동
    $('header .tab .ctr .move').on('click', function () {
      const isNext = $(this).hasClass('next');
      const scrollValue = isNext ? $('.tab ul').width() : 0;

      $('header .tab .tab_wrap').animate({
        scrollLeft: scrollValue
      });
    });
  }

  /* 토스트 팝업 제어 */
  const handleToast = () => {
    const $toast = $('[data-toast]');
    const TOAST_DURATION_SECOND = 2;
    let toastTimeout;

    window.showToast = (msg, duration = TOAST_DURATION_SECOND) => {
      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }
      $toast.text(msg).addClass('on');
      toastTimeout = setTimeout(() => {
        $toast.removeClass('on');
      }, duration * 1000);
    };
  }

  /* 로딩 제어 */
  const handleLoading = () => {
    const toggleLoading = (action, opt) => {
      const $loading = $('[data-loading]');
      $loading.toggleClass('on', action === 'open');
      if (action === 'close') {
        $loading.removeClass();
      } else if (opt) {
        $loading.addClass(opt);
      }
    }

    window.showLoading = (opt) => toggleLoading('open', opt);
    window.hideLoading = () => toggleLoading('close');
  }

  /* 모달 팝업 제어 */
  const handleModal = () => {
    const toggleModal = (modalId, action) => {
      const $modalTarget = $(`#${modalId}`);
      $modalTarget.toggleClass('on', action === 'open');
    };
    window.openModal = (modalId) => toggleModal(modalId, 'open');
    window.closeModal = (modalId) => toggleModal(modalId, 'close');
  }

  /* Textarea 포커스 제어 */
  const handleTextareaFocus = () => {
    const $textareas = $('[data-input-group] textarea');
    $textareas.each(function () {
      const $textareaWrap = $(this).closest('.textarea_wrap');
      const $fieldset = $(this).closest('fieldset');
      if ($(this).is('[readonly], [disabled]') || $fieldset.is('[disabled]')) {
        $textareaWrap.addClass('disabled');
      }
    });

    $textareas.on('focus blur', function (event) {
      const $textareaWrap = $(this).closest('.textarea_wrap');
      if ($(this).is('[readonly], [disabled]')) return;
      $textareaWrap.toggleClass('focus', event.type === 'focus');
    }).on('input', function () {
      $(this).css('height', 'auto');
      $(this).css('height', this.scrollHeight + 'px');
    })
  }

  /* 그리드 타입 테이블 제어 */
  const handleGridTable = () => {
    const $gridTable = $('[data-table].grid');
    $gridTable.each(function () {
      const $table = $(this);
      const $headerCheckbox = $table.find('.grid_select_all');
      const $rowCheckboxes = $table.find('.grid_select');

      const updateRowAndHeader = () => {
        const allChecked = $rowCheckboxes.length === $rowCheckboxes.filter(':checked').length;
        $headerCheckbox.prop('checked', allChecked);
        $rowCheckboxes.each(function () {
          $(this).closest('tr').toggleClass('on', $(this).is(':checked'));
        });
      };

      $rowCheckboxes.on('change', updateRowAndHeader);

      $headerCheckbox.on('change', function () {
        $rowCheckboxes.prop('checked', this.checked);
        updateRowAndHeader();
      });
    });
  };

  /* 페이지 프린트 제어 */
  const printPage = (width = 1000, callback) => {
    const AllowedWidthArray = [640, 800, 1000, 1200];
    const wrap = document.querySelector('.wrap');
    const printContent = document.getElementById('print').innerHTML;
    const initWrap = wrap.innerHTML;

    if (!AllowedWidthArray.includes(width)) {
      console.error(`${width}는 스타일 시트에 정의되지 않은 너비입니다. _grid.scss를 확인해주세요.`);
      return;
    }

    window.onbeforeprint = () => {
      wrap.innerHTML = printContent;
      wrap.classList.add('print', `w${width}`);
      showLoading('blind');
    };

    window.onafterprint = () => {
      wrap.innerHTML = initWrap;
      wrap.classList.remove('print', `w${width}`);
      hideLoading();
      callback();
    };

    window.print();
  };
  window.printPage = printPage;

  $(() => {
    handleGnb();
    handleSnb();
    handleInput();
    handleDropdown();
    handleTabMenu();
    handleGnbTab();
    handleToast();
    handleLoading();
    handleModal();
    handleTextareaFocus();
    handleGridTable();
    $(".datepicker").datepicker({
      dateFormat: 'yy.mm.dd',
      showMonthAfterYear: true,
      changeYear: true,
      changeMonth: true,
      gotoCurrent: true,
      showButtonPanel: true,
      currentText: 'Today',
      closeText: '닫기',
      prevText: '이전 달',
      nextText: '다음 달',
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      weekHeader: '주',
      yearSuffix: '년 '
    });
    $(".monthpicker").monthpicker({
      dateFormat: 'yy.mm',
      changeYear: true,
    });
  });

  $.datepicker._gotoToday = function (id) {
    $(id).datepicker('setDate', new Date()).datepicker('hide').blur();
  };
})(jQuery);