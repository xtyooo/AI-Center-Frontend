<template>
  <a-button type="outline" @click="handleClick">AI 生成题目</a-button>
  <a-drawer :width="340" :visible="visible" @ok="handleOk" @cancel="handleCancel" unmountOnClose>
    <template #title> AI 生成题目</template>
    <div>
      <a-form :model="form" label-align="left" auto-label-width>
        <a-form-item label="应用 id">
          {{ appId }}
        </a-form-item>
        <a-form-item field="questionNumber" label="题目数量">
          <a-input-number v-model="form.questionNumber" placeholder="请输入题目数量" />
        </a-form-item>
        <a-form-item field="optionNumber" label="选项数量">
          <a-input-number v-model="form.optionNumber" placeholder="请输入选项数量" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button :loading="submitting" type="primary" html-type="submit" style="width: 120px"
              @click="handleSubmit">
              {{ submitting ? "生成中" : "一键生成" }}
            </a-button>
            <a-button :loading="submitting" style="width: 120px" @click="doSSESubmit">
              {{ submitting ? "生成中" : "实时生成" }}
            </a-button>
          </a-space>
        </a-form-item>

      </a-form>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, withDefaults } from "vue";
import API from "@/api";
import { aiGenerateQuestionUsingPost } from "@/api/appController";
import message from "@arco-design/web-vue/es/message";

interface Props {
  appId: string;
  onSuccess?: (result: API.QuestionContentDTO[]) => void;
  onSSESuccess?: (result: API.QuestionContentDTO) => void;
  onSSEClose?: (event: any) => void;
  onSSEStart?: (event: any) => void;
}

const props = withDefaults(defineProps<Props>(), {
  appId: () => {
    return "";
  },
});

const visible = ref(false);
const submitting = ref(false);
const sseSubmitting = ref(false);
const form = reactive({
  questionNumber: 10,
  optionNumber: 2,
} as API.AiGenerateQuestionRequest);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};

/**
 * 提交
 */
const handleSubmit = async () => {
  if (!props.appId) {
    return;
  }
  submitting.value = true;
  const res = await aiGenerateQuestionUsingPost({
    appId: props.appId as any,
    ...form,
  });
  if (res.data.code === 0 && res.data.data && res.data.data.length > 0) {
    if (props.onSuccess) {
      props.onSuccess(res.data.data);
    } else {
      message.success("生成成功");
    }
    handleCancel();
  } else {
    message.error("操作失败，" + res.data.message);
  }
  submitting.value = false;
};

/**
 * sse提交
 */
const doSSESubmit = async () => {
  if (!props.appId) {
    return;
  }

  sseSubmitting.value = true;
  const eventSource = new EventSource(
    // 使用相对路径，这样会自动适应当前环境
    "/api/app/ai_generate/sse?appId=" + props.appId +
    "&questionNumber=" + form.questionNumber + "&optionNumber=" + form.optionNumber
  )
  let first = true;
  // 接收消息
  eventSource.onmessage = function (event) {
    if (first) {
      props.onSSEStart?.(event);
      handleCancel();
      first = !first;
    }
    props.onSSESuccess?.(JSON.parse(event.data));
  };
  // 报错或连接关闭时触发
  eventSource.onerror = function (event) {
    if (event.eventPhase === EventSource.CLOSED) {
      console.log("关闭连接");
      props.onSSEClose?.(event);
      eventSource.close();
    } else {
      eventSource.close();
    }
  };

  sseSubmitting.value = false;
}
</script>
